import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.roomsService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto) {
    try {
      return this.roomsService.update(+id, updateRoomDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.roomsService.remove(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
