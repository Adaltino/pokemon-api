import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('trainers')
@Controller('trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Cria um novo treinador' })
  @ApiResponse({ status: 201, description: 'Treinador criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainerService.create(createTrainerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os treinadores' })
  @ApiResponse({ status: 200, description: 'Lista de treinadores retornada com sucesso.' })
  findAll() {
    return this.trainerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um treinador pelo ID' })
  @ApiResponse({ status: 200, description: 'Treinador encontrado.' })
  @ApiNotFoundResponse({ description: 'Treinador não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.trainerService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Atualiza dados de um treinador pelo ID' })
  @ApiResponse({ status: 200, description: 'Treinador atualizado com sucesso.' })
  @ApiNotFoundResponse({ description: 'Treinador não encontrado.' })
  update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.trainerService.update(id, updateTrainerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um treinador pelo ID' })
  @ApiResponse({ status: 204, description: 'Treinador removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Treinador não encontrado.' })
  remove(@Param('id') id: string) {
    return this.trainerService.remove(id);
  }
}
