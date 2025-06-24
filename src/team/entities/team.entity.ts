import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trainer } from '../../trainer/entities/trainer.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomeDoTime: string;

  @ManyToOne(() => Trainer, (trainer) => trainer.teams, { onDelete: 'CASCADE' })
  trainer: Trainer;
}