import { Test, TestingModule } from '@nestjs/testing';
import { SurveyUserController } from './survey-user.controller';
import { SurveyUserService } from './survey-user.service';

describe('SurveyUserController', () => {
  let controller: SurveyUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveyUserController],
      providers: [SurveyUserService],
    }).compile();

    controller = module.get<SurveyUserController>(SurveyUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
