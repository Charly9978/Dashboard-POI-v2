import { commonEntity } from 'src/commun/entities/commun.entity';
import { Column, Entity } from 'typeorm';

export enum Roles {
  READER = 'reader',
  WRITER = 'writer',
}

@Entity()
export class User extends commonEntity {
  @Column({ nullable: true })
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ type: 'boolean', width: 1, default: true })
  admin: boolean;

  @Column({ type: 'enum', enum: Roles, default: Roles.READER })
  logRole: Roles;

  @Column({ type: 'enum', enum: Roles, default: Roles.READER })
  dashBoardRole: Roles;
}
