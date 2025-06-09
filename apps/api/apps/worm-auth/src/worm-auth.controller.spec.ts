import { Test, TestingModule } from '@nestjs/testing';
import { WormAuthController } from './worm-auth.controller';
import { WormAuthService } from './worm-auth.service';

describe('WormAuthController', () => {
  let wormAuthController: WormAuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WormAuthController],
      providers: [WormAuthService],
    }).compile();

    wormAuthController = app.get<WormAuthController>(WormAuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wormAuthController.getHello()).toBe('Hello World!');
    });
  });
});
