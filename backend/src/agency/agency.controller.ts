import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('agency')
@ApiTags("Agency (Агенство)")
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  

  @Get()
  findAll() {
    return this.agencyService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:"Находит агенство по id"})
  findOne(@Param('id') id: string) {
    return this.agencyService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({summary:"Обновляет агенство"})
  update(@Param('id') id: string, @Body() updateAgencyDto: UpdateAgencyDto) {
    return this.agencyService.update(id, updateAgencyDto);
  }

  @Delete(':id')
  @ApiOperation({summary:"Удаляет агенство"})
  remove(@Param('id') id: string) {
    return this.agencyService.remove(+id);
  }
}
