import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';
import { SavedController } from './saved/saved.controller';
import { SavedService } from './saved/saved.service';


@Module({
controllers: [UsersController, WeatherController, SavedController],
providers: [UsersService, WeatherService, SavedService],
})
export class AppModule {}