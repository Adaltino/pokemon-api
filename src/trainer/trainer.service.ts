import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from './entities/trainer.entity';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  async create(createTrainerDto: CreateTrainerDto): Promise<Trainer> {
    const trainer = this.trainerRepository.create(createTrainerDto);
    return this.trainerRepository.save(trainer);
  }

  findAll(): Promise<Trainer[]> {
    return this.trainerRepository.find({ relations: ['teams'] });
  }

  async findOne(id: string): Promise<Trainer> {
    const trainer = await this.trainerRepository.findOne({
      where: { id },
      relations: ['teams'],
    });

    if (!trainer) {
      throw new NotFoundException(`Trainer with id ${id} not found`);
    }

    return trainer;
  }

  async update(id: string, updateTrainerDto: UpdateTrainerDto): Promise<Trainer> {
    const trainer = await this.findOne(id);
    Object.assign(trainer, updateTrainerDto);
    return this.trainerRepository.save(trainer);
  }

  async remove(id: string): Promise<void> {
    const trainer = await this.findOne(id);
    await this.trainerRepository.remove(trainer);
  }
}
