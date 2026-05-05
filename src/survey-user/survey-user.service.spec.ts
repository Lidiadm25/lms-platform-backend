import { Test, TestingModule } from '@nestjs/testing';
import { SurveyUserService } from './survey-user.service';

describe('SurveyUserService', () => {
  let service: SurveyUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyUserService],
    }).compile();

    service = module.get<SurveyUserService>(SurveyUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
