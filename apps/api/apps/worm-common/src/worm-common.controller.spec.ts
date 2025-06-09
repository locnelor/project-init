import { Test, TestingModule } from '@nestjs/testing';
import { WormCommonController } from './worm-common.controller';
import { WormCommonService } from './worm-common.service';

describe('WormCommonController', () => {
  let wormCommonController: WormCommonController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WormCommonController],
      providers: [WormCommonService],
    }).compile();

    wormCommonController = app.get<WormCommonController>(WormCommonController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wormCommonController.getHello()).toBe('Hello World!');
    });
  });
});
