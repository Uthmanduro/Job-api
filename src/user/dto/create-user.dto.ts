import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Query } from '@nestjs/common';

export class CreateUserDto {
  @IsOptional()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  resumeUrl: string;

  @ApiProperty()
  profilePicUrl: string;

  @ApiProperty()
  workExperience: string;

  @ApiProperty({ enum: ['USER', 'ADMIN'] })
  @IsEnum(Role)
  role: Role;
}
