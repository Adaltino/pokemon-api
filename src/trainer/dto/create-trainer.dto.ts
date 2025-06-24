import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTrainerDto {
  @ApiProperty({ description: 'Nome do treinador' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiPropertyOptional({ description: 'Cidade de origem do treinador' })
  @IsOptional()
  @IsString()
  cidadeOrigem?: string;
}
