import { Controller, Post, Delete, Get, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeamPokemonService } from './team-pokemon.service';
import { AddTeamPokemonDto } from './dto/add-team-pokemon.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('team-pokemons')
@Controller('teams/:teamId/pokemons')
export class TeamPokemonController {
  constructor(private readonly service: TeamPokemonService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Adiciona um Pokémon ao time' })
  @ApiResponse({ status: 201, description: 'Pokémon adicionado com sucesso ao time.' })
  @ApiResponse({ status: 400, description: 'Pokémon inválido ou time cheio.' })
  @ApiNotFoundResponse({ description: 'Time não encontrado.' })
  add(
    @Param('teamId') teamId: string,
    @Body() dto: AddTeamPokemonDto,
  ) {
    return this.service.add(teamId, dto.pokemonIdOuNome);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os Pokémon do time' })
  @ApiResponse({ status: 200, description: 'Lista de Pokémon retornada com sucesso.' })
  @ApiNotFoundResponse({ description: 'Time não encontrado.' })
  list(@Param('teamId') teamId: string) {
    return this.service.list(teamId);
  }

  @Delete(':teamPokemonId')
  @ApiOperation({ summary: 'Remove um Pokémon do time' })
  @ApiResponse({ status: 204, description: 'Pokémon removido com sucesso do time.' })
  @ApiNotFoundResponse({ description: 'Pokémon ou time não encontrado.' })
  remove(
    @Param('teamId') teamId: string,
    @Param('teamPokemonId') teamPokemonId: string,
  ) {
    return this.service.remove(teamId, teamPokemonId);
  }
}
