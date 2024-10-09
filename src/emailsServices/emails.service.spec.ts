import { Test, TestingModule } from '@nestjs/testing';
import { emailServices } from './emails.service';

describe('emailService', () => {
  let service: emailServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [emailServices],
    }).compile();

    service = module.get<emailServices>(emailServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
