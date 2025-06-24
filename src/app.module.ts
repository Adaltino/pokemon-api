import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TrainerModule } from './trainer/trainer.module';
import { TeamModule } from './team/team.module';
import { TeamPokemonModule } from './team-pokemon/team-pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TrainerModule,
    TeamModule,
    TeamPokemonModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
