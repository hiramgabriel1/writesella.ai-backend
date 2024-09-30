// data-source.ts
import { DataSource } from 'typeorm';
import { UserEntity } from './src/user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5436,
  username: 'writtesellai',
  password: 'writtesellai',
  database: 'writtesellai',
  entities: [UserEntity],
  migrations: ['src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
  ssl: false,
});
