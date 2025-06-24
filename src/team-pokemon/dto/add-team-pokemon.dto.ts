import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddTeamPokemonDto {
  @ApiProperty({ description: 'ID ou nome do Pokémon a ser adicionado ao time' })
  @IsNotEmpty()
  @IsString()
  pokemonIdOuNome: string;
}
