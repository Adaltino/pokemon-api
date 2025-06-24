import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Cria um novo time para um treinador' })
  @ApiResponse({ status: 201, description: 'Time criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() dto: CreateTeamDto) {
    return this.teamService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os times' })
  @ApiResponse({ status: 200, description: 'Lista de times retornada com sucesso.' })
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um time pelo ID' })
  @ApiResponse({ status: 200, description: 'Time encontrado.' })
  @ApiNotFoundResponse({ description: 'Time não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Get('trainer/:trainerId')
  @ApiOperation({ summary: 'Lista todos os times de um treinador específico' })
  @ApiResponse({ status: 200, description: 'Lista de times retornada com sucesso.' })
  @ApiNotFoundResponse({ description: 'Treinador não encontrado.' })
  findByTrainer(@Param('trainerId') trainerId: string) {
    return this.teamService.findByTrainer(trainerId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Atualiza os dados de um time pelo ID' })
  @ApiResponse({ status: 200, description: 'Time atualizado com sucesso.' })
  @ApiNotFoundResponse({ description: 'Time não encontrado.' })
  update(@Param('id') id: string, @Body() dto: UpdateTeamDto) {
    return this.teamService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um time pelo ID' })
  @ApiResponse({ status: 204, description: 'Time removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Time não encontrado.' })
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
