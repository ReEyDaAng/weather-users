import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SaveUserDto } from './saved.dto';

@Controller('api/saved')
export class SavedController {
  constructor(private readonly saved: SavedService) {}

  @Get()
  list() {
    return this.saved.list();
  }

  /*@Post()
  save(@Body() dto: SaveUserDto) {
    return this.saved.save(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saved.remove(id);
  }*/
}
