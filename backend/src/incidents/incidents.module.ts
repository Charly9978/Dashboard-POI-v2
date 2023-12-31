import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { IncidentsController } from './incidents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './entities/incident.entity';
import { Room } from 'src/rooms/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Incident, Room])],
  controllers: [IncidentsController],
  providers: [IncidentsService],
})
export class IncidentsModule {}
