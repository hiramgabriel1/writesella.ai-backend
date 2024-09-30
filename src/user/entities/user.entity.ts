import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumnCannotBeNullableError } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false, unique: false })
  firstName: string;

  @Column({ type: 'varchar', length: 30, nullable: false, unique: false })
  lastName: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: false })
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: false })
  role: string

  @Column({ type: 'boolean', default: false })
  isMemberTeam: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: false })
  team: string
    
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;
}