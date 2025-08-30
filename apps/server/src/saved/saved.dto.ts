import { IsString, IsOptional, IsObject } from 'class-validator';
import type { AppUser } from 'src/common/types';

export class SaveUserDto {
  @IsString()
  id: string;

  @IsObject()
  payload: AppUser;

  @IsOptional()
  created_at?: string;
}
