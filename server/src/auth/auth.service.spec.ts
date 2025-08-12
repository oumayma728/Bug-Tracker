import { Test, TestingModule } from '@nestjs/testing'; 
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
//creating a group of test called "AuthService"
describe('AuthService', () => {
  //service:keep your AuthService in service during tests
  let service: AuthService;
//before each test -> create fake environment to run your service
  beforeEach(async () => {
    //create testing Module 
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        //providers : the list of services or things your service depends on

        AuthService,
        {
          provide: getModelToken('User'), // fake User database
          useValue: {}, // fake register function (does nothing)
        },
        {
          provide: JwtService, // mock JwtService
          useValue: {
            sign: jest.fn().mockReturnValue('fakeToken'),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
