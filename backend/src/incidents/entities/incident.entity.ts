import { commonEntity } from 'src/commun/entities/commun.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Todo } from 'src/todos/entities/todo.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

export enum IncidentStatus {
  FINISH = 'finish',
  CONTROLLED = 'controlled',
  EVOLUTION = 'inevolution',
  ARCHIVED = 'archived',
}

export enum IncidentCinetic {
  SLOW = 'slow',
  FAST = 'fast',
}

@Entity()
export class Incident extends commonEntity {
  @Column({ type: 'datetime', nullable: true })
  close_at: Date;

  @Column('datetime')
  date: Date;

  @Column({ type: 'boolean', width: 1, default: true })
  is_exercice: boolean;

  @Column('text')
  description: string;

  @Column()
  localisation: string;

  @Column({ type: 'boolean', width: 1, default: false })
  emergency_call: boolean;

  @Column({ type: 'boolean', width: 1, default: false })
  containment: boolean;

  @Column({ type: 'boolean', width: 1, default: false })
  evacuation: boolean;

  @Column({ type: 'int', default: 0 })
  victims_death: number;

  @Column({ type: 'int', default: 0 })
  victims_ua: number;

  @Column({ type: 'int', default: 0 })
  victims_ur: number;

  @Column({ type: 'int', default: 0 })
  victims_involved: number;

  @Column({ type: 'text', nullable: true })
  impact_on_site: string;

  @Column({ type: 'text', nullable: true })
  impact_outside: string;

  @Column({ type: 'text', nullable: true })
  external_communication: string;

  @Column({ type: 'text', nullable: true })
  observations: string;

  @Column({ type: 'datetime', nullable: true })
  poi_open_at: Date;

  @Column({ type: 'datetime', nullable: true })
  poi_close_at: Date;

  @Column({ type: 'boolean', width: 1, default: false })
  external_effect: boolean;

  @Column({
    type: 'enum',
    enum: IncidentStatus,
    default: IncidentStatus.EVOLUTION,
  })
  status: IncidentStatus;

  @Column({ nullable: true })
  chemical_name: string;

  @Column({ nullable: true })
  chemical_qty: string;

  @Column({ type: 'enum', enum: IncidentCinetic, nullable: true })
  cinetic: IncidentCinetic;

  @Column({ type: 'boolean', width: 1, nullable: true })
  risk_thermic: boolean;

  @Column({ type: 'boolean', width: 1, nullable: true })
  risk_toxic: boolean;

  @Column({ type: 'boolean', width: 1, nullable: true })
  risk_surpressure: boolean;

  @Column({ type: 'boolean', width: 1, nullable: true })
  risk_environmental: boolean;

  @Column({ type: 'boolean', width: 1, default: false })
  facilities_stop: boolean;

  @Column({ type: 'text', nullable: true })
  facilties_actions: string;

  @Column({ type: 'boolean', width: 1, default: false })
  possibleRiskForPopulation: boolean;

  @Column({ type: 'boolean', width: 1, default: false })
  contactMunicipalty: boolean;

  @Column({ type: 'boolean', width: 1, default: false })
  contactNeighbourhood: boolean;

  @ManyToOne(() => Room)
  crisis_room: Room;

  @Column()
  crisisRoomId: number;

  @OneToMany(() => Todo, (todo) => todo.incident, {
    cascade: true,
  })
  todos: Todo[];
}
