import { Test, TestingModule } from '@nestjs/testing';
import { User_service } from './user.service';

describe('User_service', () => {
  let service: User_service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [User_service],
    }).compile();

    service = module.get<User_service>(User_service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
