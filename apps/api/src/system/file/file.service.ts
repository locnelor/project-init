import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { QueryFileDto } from './dto/query-file.dto';
import { PaginationHelper, PaginationResult } from '../../common/dto/pagination.dto';
import { FileService as LibFileService } from '@app/file';
import { HashService } from '@app/hash';
import { RandomNameService } from '@app/utils';
import { Prisma } from '@pkg/database';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly libFileService: LibFileService,
    private readonly hashService: HashService,
    private readonly randomNameService: RandomNameService,
  ) { }

  /**
   * 获取所有文件
   */
  async findAll() {
    return await this.prisma.sys_media.findMany({
      include: {
        creator: {
          select: {
            uid: true,
            name: true,
            account: true,
          },
        },
        _count: {
          select: {
            users: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * 分页查询文件
   */
  async findMany(queryDto: QueryFileDto): Promise<PaginationResult<any>> {
    const { page = 1, size = 10, filename, original_name, mime_type, user_id } = queryDto;
    const skip = PaginationHelper.getSkip(page, size);

    const where: Prisma.sys_mediaWhereInput = {
      enabled: true,
    };

    if (filename) {
      where.name = { contains: filename };
    }
    if (original_name) {
      where.alias = { contains: original_name };
    }
    if (mime_type) {
      where.mimeType = { contains: mime_type };
    }
    if (user_id) {
      where.creator_id = user_id;
    }

    const [data, total] = await Promise.all([
      this.prisma.sys_media.findMany({
        where,
        include: {
          creator: {
            select: {
              uid: true,
              name: true,
              account: true,
            },
          },
          _count: {
            select: {
              users: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: size,
      }),
      this.prisma.sys_media.count({ where }),
    ]);

    return PaginationHelper.createResult(data, total, page, size);
  }

  /**
   * 根据ID获取文件详情
   */
  async findOne(uid: string) {
    const file = await this.prisma.sys_media.findUnique({
      where: { uid },
      include: {
        creator: {
          select: {
            uid: true,
            name: true,
            account: true,
          },
        },
        users: {
          include: {
            user: {
              select: {
                uid: true,
                name: true,
                account: true,
              },
            },
          },
        },
      },
    });

    if (!file) {
      throw new NotFoundException('文件不存在');
    }

    return file;
  }

  /**
   * 创建文件记录
   */
  async create(createFileDto: CreateFileDto, userId?: string) {
    const { filename, original_name, mime_type, size, path: filePath, url, access_type, description } = createFileDto;

    // 生成文件hash
    let hash: string;
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      hash = this.hashService.md5(fileBuffer);
    } else {
      throw new BadRequestException('文件不存在');
    }

    // 检查是否已存在相同hash的文件
    const existingFile = await this.prisma.sys_media.findUnique({
      where: { hash },
    });
    if (existingFile) {
      throw new BadRequestException('文件已存在');
    }

    // 获取文件扩展名
    const extension = path.extname(filename).toLowerCase();

    // 生成文件别名（如果没有提供original_name）
    const alias = original_name || this.randomNameService.getNickName();

    // 确定文件类型
    let type = 'file';
    if (mime_type.startsWith('image/')) {
      type = 'image';
    } else if (mime_type.startsWith('video/')) {
      type = 'video';
    } else if (mime_type.startsWith('audio/')) {
      type = 'audio';
    } else if (mime_type.includes('pdf') || mime_type.includes('document') || mime_type.includes('text')) {
      type = 'document';
    }


    return await this.prisma.sys_media.create({
      data: {
        name: filename,
        alias,
        size,
        hash,
        mimeType: mime_type,
        extension,
        path: filePath,
        url,
        access_type,
        type,
        keywords: description,
        creator_id: userId,
      },
      include: {
        creator: {
          select: {
            uid: true,
            name: true,
            account: true,
          },
        },
      },
    });
  }

  /**
   * 更新文件信息
   */
  async update(uid: string, updateFileDto: UpdateFileDto) {
    // 检查文件是否存在
    const existingFile = await this.prisma.sys_media.findUnique({
      where: { uid },
    });
    if (!existingFile) {
      throw new NotFoundException('文件不存在');
    }

    // 如果更新了文件路径，需要重新计算hash
    let updateData = { ...updateFileDto, hash: '' };
    if (updateFileDto.path && updateFileDto.path !== existingFile.path) {
      if (fs.existsSync(updateFileDto.path)) {
        const fileBuffer = fs.readFileSync(updateFileDto.path);
        const newHash = this.hashService.md5(fileBuffer);

        // 检查新hash是否与其他文件冲突
        const conflictFile = await this.prisma.sys_media.findFirst({
          where: {
            hash: newHash,
            uid: { not: uid },
          },
        });
        if (conflictFile) {
          throw new BadRequestException('文件hash冲突');
        }

        updateData.hash = newHash;
      } else {
        throw new BadRequestException('新文件路径不存在');
      }
    }

    return await this.prisma.sys_media.update({
      where: { uid },
      data: updateData,
      include: {
        creator: {
          select: {
            uid: true,
            name: true,
            account: true,
          },
        },
      },
    });
  }

  /**
   * 删除文件
   */
  async remove(uid: string) {
    const file = await this.prisma.sys_media.findUnique({
      where: { uid },
    });

    if (!file) {
      throw new NotFoundException('文件不存在');
    }

    // 删除物理文件
    if (fs.existsSync(file.path)) {
      try {
        fs.unlinkSync(file.path);
      } catch (error) {
        console.warn(`删除物理文件失败: ${file.path}`, error);
      }
    }

    // 删除用户文件关联
    await this.prisma.sys_user_media.deleteMany({
      where: { media_id: uid },
    });

    // 删除文件记录
    return await this.prisma.sys_media.delete({
      where: { uid },
    });
  }

  /**
   * 将文件分配给用户
   */
  async assignToUser(fileId: string, userId: string) {
    // 检查文件是否存在
    const file = await this.prisma.sys_media.findUnique({
      where: { uid: fileId },
    });
    if (!file) {
      throw new NotFoundException('文件不存在');
    }

    // 检查用户是否存在
    const user = await this.prisma.sys_user.findUnique({
      where: { uid: userId },
    });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    // 检查是否已经关联
    const existing = await this.prisma.sys_user_media.findUnique({
      where: {
        user_id_media_id: {
          user_id: userId,
          media_id: fileId,
        },
      },
    });
    if (existing) {
      throw new BadRequestException('文件已分配给该用户');
    }

    return await this.prisma.sys_user_media.create({
      data: {
        user_id: userId,
        media_id: fileId,
      },
      include: {
        user: {
          select: {
            uid: true,
            name: true,
            account: true,
          },
        },
        media: true,
      },
    });
  }

  /**
   * 移除用户的文件关联
   */
  async removeFromUser(fileId: string, userId: string) {
    const userMedia = await this.prisma.sys_user_media.findUnique({
      where: {
        user_id_media_id: {
          user_id: userId,
          media_id: fileId,
        },
      },
    });

    if (!userMedia) {
      throw new NotFoundException('用户文件关联不存在');
    }

    return await this.prisma.sys_user_media.delete({
      where: {
        user_id_media_id: {
          user_id: userId,
          media_id: fileId,
        },
      },
    });
  }

  /**
   * 获取用户关联的文件
   */
  async getUserFiles(userId: string) {
    // 检查用户是否存在
    const user = await this.prisma.sys_user.findUnique({
      where: { uid: userId },
    });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    const userMedia = await this.prisma.sys_user_media.findMany({
      where: { user_id: userId },
      include: {
        media: {
          include: {
            creator: {
              select: {
                uid: true,
                name: true,
                account: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return userMedia.map(item => item.media);
  }

  /**
   * 上传文件到媒体目录
   */
  async uploadFile(file: Express.Multer.File, userId?: string) {
    // 生成唯一文件名
    const fileId = this.hashService.createUid().replace(/-/g, '');
    const extension = path.extname(file.originalname);
    const filename = `${fileId}${extension}`;

    // 保存文件到媒体目录
    const mediaDir = this.libFileService.getMediaDir(fileId);
    const filePath = path.join(mediaDir, filename);

    // 确保目录存在
    if (!fs.existsSync(mediaDir)) {
      fs.mkdirSync(mediaDir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(filePath, file.buffer);

    // 创建文件记录
    const createFileDto: CreateFileDto = {
      filename,
      original_name: file.originalname,
      mime_type: file.mimetype,
      size: file.size,
      path: filePath,
      access_type: 'PRIVATE',
    };

    return await this.create(createFileDto, userId);
  }
}
