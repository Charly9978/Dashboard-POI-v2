import { Incident } from 'src/incidents/entities/incident.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';

export enum TypeOfTodo {
  LIVE = 'Live',
  AUTORITY = 'Autorités',
  MUNICIPALTY = 'Mairies',
  NEIGHBOURHOOD = 'Voisinage',
}

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'datetime', nullable: true })
  close_at: Date;

  @Column('datetime')
  objectifDate: Date;

  @Column()
  description: string;

  @Column({ nullable: true })
  comments: string;

  @Column({ type: 'enum', enum: TypeOfTodo, default: TypeOfTodo.LIVE })
  typeOfTodo: TypeOfTodo = TypeOfTodo.LIVE;

  @Column({ nullable: true, type: 'text' })
  exerciceDescription: string;

  @Column()
  incidentId: number;

  @ManyToOne(() => Incident, (incident) => incident.todos)
  incident: Incident;
}
