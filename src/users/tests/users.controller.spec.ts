import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a users sucessfuly', async () => {

    });
  });

  describe('findAll', () => {
    it('should return a users list sucessfuly', async () => {

    });
  });

  describe('findOne', () => {
    it('should return a users by id sucessfuly', async () => {

    });
  });

  describe('remove', () => {
    it('should remove a users by id sucessfuly', async () => {

    });
  });
});
