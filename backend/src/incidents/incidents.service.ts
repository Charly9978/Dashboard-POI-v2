import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from './entities/incident.entity';
import { Repository } from 'typeorm';
import { Room } from '../rooms/entities/room.entity';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Incident)
    private incidentRepository: Repository<Incident>,
  ) {}

  create(createIncidentDto: CreateIncidentDto) {
    const incident = this.incidentRepository.create({ ...createIncidentDto });
    return this.incidentRepository.save(incident);
  }

  findAll(): Promise<Incident[]> {
    return this.incidentRepository.find({
      relations: {
        crisis_room: true,
      },
      select: {
        date: true,
        description: true,
        id: true,
        is_exercice: true,
        crisis_room: {
          name: true,
        },
        status: true,
      },
    });
  }

  findOne(id: number): Promise<Incident> {
    return this.incidentRepository.findOneOrFail({
      where: { id },
      relations: { crisis_room: true, todos: true },
    });
  }

  async update(id: number, updateIncidentDto: UpdateIncidentDto) {
    try {
      const incidentToUpdate = await this.incidentRepository.findOneOrFail({
        where: { id },
        relations: {
          crisis_room: true,
          todos: true,
        },
      });
      if (incidentToUpdate.crisis_room.id != updateIncidentDto.crisisRoomId) {
        console.log('test');
        const newRoom = await this.roomRepository.findOneBy({
          id: updateIncidentDto.crisisRoomId,
        });
        incidentToUpdate.crisis_room = newRoom;
      }
      Object.assign(incidentToUpdate, updateIncidentDto);
      return this.incidentRepository.save(incidentToUpdate);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  remove(id: number) {
    return this.incidentRepository.delete({ id });
  }
}
