import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';
import { Body } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

const usersList: User[] = [
  new User({id: 1, nome: 'thiago', sobrenome: 'mota'}),
  new User({id: 2, nome: 'felipe', sobrenome: 'cordeiro'}),
  new User({id: 3, nome: 'cora', sobrenome: 'jones'}),
]

const newUsersEntity = new User({ nome: 'novo', sobrenome: 'usuario' });

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
            create: jest.fn().mockResolvedValue(newUsersEntity),
            findAll: jest.fn().mockResolvedValue(usersList),
            findOne: jest.fn().mockResolvedValue(usersList[0]),
            remove: jest.fn().mockResolvedValue(undefined),
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
      const body: CreateUserDto = {
        nome: 'novo',
        sobrenome: 'usuario'
      };

      const result = await usersController.create(body)

      expect(result).toEqual(newUsersEntity);
      expect(usersService.create).toHaveBeenCalledTimes(1);
      expect(usersService.create).toHaveBeenCalledWith(body);
    });

    it('should return an exception', () => {
      const body: CreateUserDto = {
        nome: 'novo',
        sobrenome: 'usuario'
      };

      jest.spyOn(usersService, 'create').mockRejectedValueOnce(new Error());

      expect(usersController.create(body)).rejects. toThrow(Error);
    })
  });

  describe('findAll', () => {
    it('should return a users list sucessfuly', async () => {
      const result = await usersController.findAll();

      expect(result).toEqual(usersList);
      expect(typeof result).toEqual('object');
      expect(usersService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an exception', () => {
      jest.spyOn(usersService, 'findAll').mockRejectedValueOnce(new Error());

      expect(usersController.findAll()).rejects. toThrow(Error);
    })
  });

  describe('findOne', () => {
    it('should return a users by id sucessfuly', async () => {
      const result = await usersController.findOne(1);

      expect(result).toEqual(usersList[0]);
      expect(usersService.findOne).toHaveBeenCalledTimes(1);
      expect(usersService.findOne).toHaveBeenCalledWith(1);
    });

    it('should return an exception', () => {
      jest.spyOn(usersService, 'findOne').mockRejectedValueOnce(new Error());

      expect(usersController.findOne(1)).rejects. toThrow(Error);
    })
  });

  describe('remove', () => {
    it('should remove a users by id sucessfuly', async () => {
      const result = await usersController.remove(1);

      expect(result).toBeUndefined();
    });

    it('should return an exception', () => {
      jest.spyOn(usersService, 'remove').mockRejectedValueOnce(new Error());

      expect(usersController.remove(1)).rejects. toThrow(Error);
    })
  });
});
