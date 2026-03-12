import { Test, TestingModule } from '@nestjs/testing';
import { SubmitTaskController } from './submit-task.controller';
import { SubmitTaskService } from './submit-task.service';

describe('SubmitTaskController', () => {
  let controller: SubmitTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitTaskController],
      providers: [SubmitTaskService],
    }).compile();

    controller = module.get<SubmitTaskController>(SubmitTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
