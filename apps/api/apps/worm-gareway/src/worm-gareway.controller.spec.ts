import { Test, TestingModule } from '@nestjs/testing';
import { WormGarewayController } from './worm-gareway.controller';
import { WormGarewayService } from './worm-gareway.service';

describe('WormGarewayController', () => {
  let wormGarewayController: WormGarewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WormGarewayController],
      providers: [WormGarewayService],
    }).compile();

    wormGarewayController = app.get<WormGarewayController>(WormGarewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wormGarewayController.getHello()).toBe('Hello World!');
    });
  });
});
