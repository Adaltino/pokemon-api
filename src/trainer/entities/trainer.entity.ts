import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Team } from '../../team/entities/team.entity';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ nullable: true })
  cidadeOrigem?: string;

  @OneToMany(() => Team, (team) => team.trainer)
  teams: Team[];
}