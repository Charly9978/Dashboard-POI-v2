import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './rooms/entities/room.entity';
import { IncidentsModule } from './incidents/incidents.module';
import { TodosModule } from './todos/todos.module';
import { Incident } from './incidents/entities/incident.entity';
import { Todo } from './todos/entities/todo.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { RecordTodosModule } from './record-todos/record-todos.module';
import { RecordTodo } from './record-todos/entities/record-todo.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        synchronize: true,
        entities: [Room, Incident, Todo, User, RecordTodo],
      }),
      inject: [ConfigService],
    }),
    RoomsModule,
    IncidentsModule,
    TodosModule,
    UsersModule,
    AuthModule,
    MessagesModule,
    RecordTodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
