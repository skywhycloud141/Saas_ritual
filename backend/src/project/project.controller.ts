import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('project')
@ApiTags("Projects (Макеты)")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post()
  @ApiOperation({summary:"Создает новый 3д макет участка"})
  create(@Body() createProjectDto:CreateProjectDto, @Req()req:{
    user:{
      agencyId: string,
      email: string
    }
  }) {
    return this.projectService.create(createProjectDto, req.user.agencyId)
  }
  @Delete(`:id`)
  @ApiOperation({summary:"Удаляет проект"})
  remove(@Param(`id`) id:string){
    return this.projectService.remove(id)
  }
  @Get('my')
  @ApiOperation({summary:"Список всех макетов агенства"})
  findAll(@Req()req:{
    user:{
      agencyId:string
    }
  }){
  return  this.projectService.show(req.user.agencyId)
    
  }
  
}

