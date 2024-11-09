import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@app/prisma';
import { HashModule } from '@app/hash';

@Module({
  imports: [PrismaModule, HashModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
