import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty()
  coverLetter: string;

  @ApiProperty()
  resumeUrl: string;

  @ApiProperty({ enum: ApplicationStatus })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
