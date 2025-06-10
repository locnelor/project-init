import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from '@app/prisma';
import { AuthPowerModule } from '@app/auth-power';

@Module({
  imports: [PrismaModule, AuthPowerModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
