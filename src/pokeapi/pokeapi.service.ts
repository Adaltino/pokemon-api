import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokeApiService {
  async getPokemonInfo(pokemonIdOrName: string): Promise<any> {
    try {
      const { data } = await axios.get(`${process.env.POKEMON_API_URL}/${pokemonIdOrName}`);
      return {
        id: data.id,
        name: data.name,
        types: data.types.map((t) => t.type.name),
        sprite: data.sprites.front_default,
      };
    } catch (error) {
      throw new NotFoundException(`Pokémon "${pokemonIdOrName}" não encontrado na PokéAPI.`);
    }
  }
}