import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Repository } from 'typeorm';
import { Team } from '../team/entities/team.entity';
import { PokeApiService } from '../pokeapi/pokeapi.service';

@Injectable()
export class TeamPokemonService {
  constructor(
    @InjectRepository(TeamPokemon)
    private teamPokemonRepo: Repository<TeamPokemon>,
    @InjectRepository(Team)
    private teamRepo: Repository<Team>,
    private pokeApiService: PokeApiService,
  ) {}

  async add(teamId: string, pokemonIdOuNome: string): Promise<TeamPokemon> {
    const team = await this.teamRepo.findOne({ where: { id: teamId } });
    if (!team) throw new NotFoundException('Time não encontrado.');

    const count = await this.teamPokemonRepo.count({ where: { team: { id: teamId } } });
    if (count >= 6) throw new BadRequestException('Limite de 6 Pokémon por time atingido.');

    await this.pokeApiService.getPokemonInfo(pokemonIdOuNome);

    const alreadyExists = await this.teamPokemonRepo.findOne({
      where: { team: { id: teamId }, pokemonIdOuNome },
    });
    if (alreadyExists) throw new BadRequestException('Este Pokémon já está no time.');

    const teamPokemon = this.teamPokemonRepo.create({ team, pokemonIdOuNome });
    return this.teamPokemonRepo.save(teamPokemon);
  }

  async remove(teamId: string, teamPokemonId: string): Promise<void> {
    const entity = await this.teamPokemonRepo.findOne({
      where: { id: teamPokemonId, team: { id: teamId } },
    });

    if (!entity) throw new NotFoundException('Pokémon não encontrado no time.');

    await this.teamPokemonRepo.remove(entity);
  }

  async list(teamId: string): Promise<any[]> {
    const entries = await this.teamPokemonRepo.find({
      where: { team: { id: teamId } },
    });

    return Promise.all(
      entries.map(async (e) => {
        const details = await this.pokeApiService.getPokemonInfo(e.pokemonIdOuNome);
        return {
          id: e.id,
          teamId,
          ...details,
        };
      }),
    );
  }
}