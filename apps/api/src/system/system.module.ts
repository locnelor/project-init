import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { DeptModule } from './dept/dept.module';
import { FileModule } from './file/file.module';
import { PrismaModule } from '@app/prisma';

@Module({
  controllers: [SystemController],
  providers: [SystemService],
  imports: [
    AuthModule,
    UserModule,
    MenuModule,
    RoleModule,
    DeptModule,
    FileModule,
    PrismaModule
  ],
})
export class SystemModule { }
