import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Trainer } from '../trainer/entities/trainer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Trainer])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}