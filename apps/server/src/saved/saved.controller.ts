import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SavedService } from './saved.service';


@Controller('api/saved')
export class SavedController {
constructor(private readonly svc: SavedService) {}


@Get()
list() { return this.svc.list(); }


@Post()
save(@Body() body: { id: string; payload: any }) { return this.svc.save(body); }


@Delete(':id')
remove(@Param('id') id: string) { return this.svc.remove(id); }
}