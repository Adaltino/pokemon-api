import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from '../team/entities/team.entity';
import { TeamPokemonService } from './team-pokemon.service';
import { TeamPokemonController } from './team-pokemon.controller';
import { PokeApiService } from '../pokeapi/pokeapi.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamPokemon, Team])],
  providers: [TeamPokemonService, PokeApiService],
  controllers: [TeamPokemonController],
})
export class TeamPokemonModule {}