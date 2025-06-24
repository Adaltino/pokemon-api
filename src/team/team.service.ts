import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Trainer } from '../trainer/entities/trainer.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  async create(dto: CreateTeamDto): Promise<Team> {
    const trainer = await this.trainerRepository.findOne({ where: { id: dto.trainerId } });

    if (!trainer) {
      throw new NotFoundException(`Trainer with id ${dto.trainerId} not found`);
    }

    const team = this.teamRepository.create({
      nomeDoTime: dto.nomeDoTime,
      trainer,
    });

    return this.teamRepository.save(team);
  }

  findAll(): Promise<Team[]> {
    return this.teamRepository.find({ relations: ['trainer'] });
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['trainer'],
    });

    if (!team) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }

    return team;
  }

  async findByTrainer(trainerId: string): Promise<Team[]> {
    return this.teamRepository.find({
      where: { trainer: { id: trainerId } },
      relations: ['trainer'],
    });
  }

  async update(id: string, dto: UpdateTeamDto): Promise<Team> {
    const team = await this.findOne(id);

    if (dto.trainerId) {
      const trainer = await this.trainerRepository.findOne({ where: { id: dto.trainerId } });
      if (!trainer) {
        throw new NotFoundException(`Trainer with id ${dto.trainerId} not found`);
      }
      team.trainer = trainer;
    }

    team.nomeDoTime = dto.nomeDoTime ?? team.nomeDoTime;

    return this.teamRepository.save(team);
  }

  async remove(id: string): Promise<void> {
    const team = await this.findOne(id);
    await this.teamRepository.remove(team);
  }
}