import { Test, TestingModule } from '@nestjs/testing';
import { WormFileController } from './worm-file.controller';
import { WormFileService } from './worm-file.service';

describe('WormFileController', () => {
  let wormFileController: WormFileController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WormFileController],
      providers: [WormFileService],
    }).compile();

    wormFileController = app.get<WormFileController>(WormFileController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wormFileController.getHello()).toBe('Hello World!');
    });
  });
});
