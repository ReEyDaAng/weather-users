import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('api/weather')
export class WeatherController {
  constructor(private readonly svc: WeatherService) {}

  @Get()
  async byCoords(@Query('lat') lat?: string, @Query('lon') lon?: string) {
    const la = Number(lat),
      lo = Number(lon);
    if (!Number.isFinite(la) || !Number.isFinite(lo))
      throw new BadRequestException('lat/lon required');
    return this.svc.byCoords(la, lo);
  }
}
