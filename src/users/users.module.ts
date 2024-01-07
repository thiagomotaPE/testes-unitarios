import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserProviders } from './user.providers';
import { TypeOrmModule } from 'src/infra/type-orm/type-orm.module';

@Module({
  imports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [UsersService, ...UserProviders],
})
export class UsersModule {}
