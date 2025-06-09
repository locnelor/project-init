import { Test, TestingModule } from '@nestjs/testing';
import { WormModulesController } from './worm-modules.controller';
import { WormModulesService } from './worm-modules.service';

describe('WormModulesController', () => {
  let wormModulesController: WormModulesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WormModulesController],
      providers: [WormModulesService],
    }).compile();

    wormModulesController = app.get<WormModulesController>(WormModulesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wormModulesController.getHello()).toBe('Hello World!');
    });
  });
});
