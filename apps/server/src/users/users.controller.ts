import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('api/users')
export class UsersController {
constructor(private readonly svc: UsersService) {}


@Get()
list(@Query('page') page?: string, @Query('results') results?: string, @Query('seed') seed?: string) {
return this.svc.fetchUsers(Number(page ?? 1), Number(results ?? 12), seed ?? 'demo');
}
}