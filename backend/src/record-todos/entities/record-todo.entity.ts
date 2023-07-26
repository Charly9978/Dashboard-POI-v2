import { commonEntity } from 'src/commun/entities/commun.entity';
import { Column, Entity } from 'typeorm';

export enum Recipient {
  AUTORITY = 'Autorités',
  MUNICIPALTY = 'Mairies',
  NEIGHBOURHOOD = 'Voisinage',
}

@Entity()
export class RecordTodo extends commonEntity {
  @Column('int')
  delay: number;

  @Column()
  description: string;

  @Column()
  excercice_description: string;

  @Column({ nullable: true, type: 'int' })
  repeatTime: number;

  @Column({ type: 'enum', enum: Recipient })
  recipient: Recipient;
}
