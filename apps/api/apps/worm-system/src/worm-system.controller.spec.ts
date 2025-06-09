import { Test, TestingModule } from '@nestjs/testing';
import { WormSystemController } from './worm-system.controller';
import { WormSystemService } from './worm-system.service';

describe('WormSystemController', () => {
  let wormSystemController: WormSystemController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WormSystemController],
      providers: [WormSystemService],
    }).compile();

    wormSystemController = app.get<WormSystemController>(WormSystemController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wormSystemController.getHello()).toBe('Hello World!');
    });
  });
});
