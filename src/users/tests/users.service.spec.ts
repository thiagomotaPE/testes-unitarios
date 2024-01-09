import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { error } from 'console';

const usersList: User[] = [
  new User({id: 1, nome: 'thiago', sobrenome: 'mota'}),
  new User({id: 2, nome: 'felipe', sobrenome: 'cordeiro'}),
  new User({id: 3, nome: 'cora', sobrenome: 'jones'}),
]


describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService, 
        {
          provide: 'USER_REPOSITORY',
          useValue: {
            save: jest.fn().mockReturnValue(usersList[0]),
            find: jest.fn().mockResolvedValue(usersList),
            findOne: jest.fn().mockResolvedValue(usersList[0]),
            delete: jest.fn().mockResolvedValue(undefined)
          },
        }
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>('USER_REPOSITORY');
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('create', () => {
    const body: CreateUserDto = {
      nome: 'novo',
      sobrenome: 'usuario'
    };

    it('should create a new user sucessfuly', async () => {
      const result = await usersService.create(body);

      expect(result).toEqual(usersList[0]);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return an exception', () => {
      jest.spyOn(usersRepository, 'save').mockRejectedValueOnce(new Error());

      expect(usersService.findOne(1)).rejects.toThrow(Error);
    })
  });

  describe('findAll', () => {
    it('should return a users list sucessfuly', async () => {
      const result = await usersService.findAll();

      expect(result).toEqual(usersList);
      expect(usersRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an exception', () => {
      jest.spyOn(usersRepository, 'find').mockRejectedValueOnce(new Error());

      expect(usersService.findAll()).rejects. toThrow(Error);
    })
  });

  describe('findOne', () => {
    it('should return a user sucessfuly', async () => {
      const result = await usersService.findOne(1);

      expect(result).toEqual(usersList[0]);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return an exception', () => {
      jest.spyOn(usersRepository, 'findOne').mockRejectedValueOnce(new NotFoundException());

      expect(usersService.findOne(1)).rejects.toThrow(NotFoundException);
    })
  });

  describe('remove', () => {
    it('should delete a user sucessfuly', async () => {
      const result = await usersService.remove(1);

      expect(result).toBeUndefined();
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(usersRepository.remove).toHaveBeenCalledTimes(1);
    });

    it('should return an exception', () => {
      jest.spyOn(usersRepository, 'findOne').mockRejectedValueOnce(new Error());

      expect(usersService.remove(1)).rejects.toThrow(NotFoundException);
    })
  });
});
