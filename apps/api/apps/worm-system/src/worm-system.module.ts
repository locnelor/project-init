import { Module } from '@nestjs/common';
import { WormSystemController } from './worm-system.controller';
import { WormSystemService } from './worm-system.service';
import { DepartmentModule } from './department/department.module';
import { MediaModule } from './media/media.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DepartmentModule,
    MediaModule,
    MenuModule,
    RoleModule,
    UserModule
  ],
  controllers: [WormSystemController],
  providers: [WormSystemService],
})
export class WormSystemModule { }
