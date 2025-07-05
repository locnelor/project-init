import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { OrgModule } from './org/org.module';
import { DeptModule } from './dept/dept.module';
import { SystemService } from './system.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MenuModule,
    RoleModule,
    OrgModule,
    DeptModule
  ],
  providers: [SystemService]
})
export class SystemModule { }
