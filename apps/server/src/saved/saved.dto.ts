import { IsString, IsObject } from 'class-validator';

export class SaveDto {
  @IsString()
  id!: string;

  @IsObject()
  payload!: Record<string, unknown>;
}
