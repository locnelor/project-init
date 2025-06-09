import { Test, TestingModule } from '@nestjs/testing';
import { WormGatewayController } from './worm-gateway.controller';
import { WormGatewayService } from './worm-gateway.service';

describe('WormGatewayController', () => {
  let wormGatewayController: WormGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WormGatewayController],
      providers: [WormGatewayService],
    }).compile();

    wormGatewayController = app.get<WormGatewayController>(WormGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wormGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
