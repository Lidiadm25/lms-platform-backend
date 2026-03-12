import { Test, TestingModule } from '@nestjs/testing';
import { SubmitTaskService } from './submit-task.service';

describe('SubmitTaskService', () => {
  let service: SubmitTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitTaskService],
    }).compile();

    service = module.get<SubmitTaskService>(SubmitTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
