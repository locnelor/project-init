import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaModule } from '@app/prisma';
import { AuthPowerModule } from '@app/auth-power';

@Module({
  imports: [
    PrismaModule,
    AuthPowerModule
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule { }
