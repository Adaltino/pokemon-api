import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Team } from '../../team/entities/team.entity';

@Entity()
@Unique(['team', 'pokemonIdOuNome'])
export class TeamPokemon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pokemonIdOuNome: string;

  @ManyToOne(() => Team, (team) => team.id, { onDelete: 'CASCADE' })
  team: Team;
}