import { Module } from '@nestjs/common';
import { TypeormProvider } from './type-orm.providers';

@Module({
  providers: [...TypeormProvider],
  exports: [...TypeormProvider],
})
export class TypeOrmModule {}
