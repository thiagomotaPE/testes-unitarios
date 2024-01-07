/* eslint-disable prettier/prettier */
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const TypeormProvider = [{
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: 'db/sql',
        entities: [User],
        synchronize: true,
      });

      return dataSource.initialize();
    },
}]