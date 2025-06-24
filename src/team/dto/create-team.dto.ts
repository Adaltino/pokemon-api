import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ description: 'Nome do time' })
  @IsNotEmpty()
  @IsString()
  nomeDoTime: string;

  @ApiProperty({ description: 'ID do treinador dono do time', format: 'uuid' })
  @IsNotEmpty()
  @IsUUID()
  trainerId: string;
}
