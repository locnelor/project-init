import { Test, TestingModule } from '@nestjs/testing';
import { WormJobController } from './worm-job.controller';
import { WormJobService } from './worm-job.service';

describe('WormJobController', () => {
  let wormJobController: WormJobController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WormJobController],
      providers: [WormJobService],
    }).compile();

    wormJobController = app.get<WormJobController>(WormJobController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wormJobController.getHello()).toBe('Hello World!');
    });
  });
});
