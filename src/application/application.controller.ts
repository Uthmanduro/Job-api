import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { AuthGuard, AdminGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('application')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  
  @Post(":jobId")
  create(@Param("jobId") jobId, @Body() applicationData: CreateApplicationDto) {
    return this.applicationService.createApplication(jobId, applicationData);
  }

  @Get(':jobId')
  findOne(@Param('JobId') jobId: string) {
    return this.applicationService.findApplicationByJob(jobId);
  }

  @Patch(':applicationId')
  @UseGuards(AdminGuard)
  update(@Param('applicationId') applicationId: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationService.update(applicationId, updateApplicationDto);
  }

  @Delete(':applicationId')
  @UseGuards(AdminGuard)
  remove(@Param(':applicationId') applicationId: string) {
    return this.applicationService.remove(applicationId);
  }
}
