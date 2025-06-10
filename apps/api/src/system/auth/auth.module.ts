import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthPowerModule } from '@app/auth-power';
import { PrismaModule } from '@app/prisma';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    AuthPowerModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
