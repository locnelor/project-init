import { Test, TestingModule } from '@nestjs/testing';
import { SystemService } from './system.service';
import { PrismaModule } from '@app/prisma';

describe('SystemService', () => {
  let service: SystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemService],
      imports: [PrismaModule]
    }).compile();

    service = module.get<SystemService>(SystemService);
  });
  it("createUser", async () => {
    await service.createUser()
  })
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
