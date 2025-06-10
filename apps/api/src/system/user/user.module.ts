import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '@app/prisma';
import { AuthPowerModule } from '@app/auth-power';
import { HashModule } from '@app/hash';
import { UtilsModule } from '@app/utils';

@Module({
  imports: [PrismaModule, AuthPowerModule, HashModule, UtilsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
