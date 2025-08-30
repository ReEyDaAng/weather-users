import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SaveDto } from './saved.dto';

@Controller('api/saved')
export class SavedController {
  constructor(private readonly service: SavedService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post()
  save(@Body() dto: SaveDto) {
    return this.service.save(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}