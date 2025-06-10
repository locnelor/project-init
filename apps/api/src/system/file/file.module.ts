import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { PrismaModule } from '@app/prisma';
import { AuthPowerModule } from '@app/auth-power';
import { FileModule as LibFileModule } from '@app/file';
import { HashModule } from '@app/hash';
import { UtilsModule } from '@app/utils';

@Module({
  imports: [PrismaModule, AuthPowerModule, LibFileModule, HashModule, UtilsModule],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
