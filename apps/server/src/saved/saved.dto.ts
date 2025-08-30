import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UserNameDto {
  @IsString() first!: string;
  @IsString() last!: string;
}

class UserLoginDto {
  @IsString() uuid!: string;
}

class UserCoordinatesDto {
  @IsString() latitude!: string;
  @IsString() longitude!: string;
}

class UserLocationDto {
  @IsString() city!: string;
  @IsString() country!: string;

  @ValidateNested()
  @Type(() => UserCoordinatesDto)
  coordinates!: UserCoordinatesDto;
}

class UserPictureDto {
  @IsString() large!: string;
}

export class AppUserDto {
  @ValidateNested()
  @Type(() => UserLoginDto)
  login!: UserLoginDto;

  @ValidateNested()
  @Type(() => UserNameDto)
  name!: UserNameDto;

  @IsString()
  gender!: string;

  @ValidateNested()
  @Type(() => UserLocationDto)
  location!: UserLocationDto;

  @IsString()
  email!: string;

  @ValidateNested()
  @Type(() => UserPictureDto)
  picture!: UserPictureDto;
}

export class SaveUserDto {
  @IsString()
  @IsNotEmpty()
  id!: string; // login.uuid

  @ValidateNested()
  @Type(() => AppUserDto)
  payload!: AppUserDto;
}