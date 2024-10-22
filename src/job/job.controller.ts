import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard, AdminGuard } from 'src/auth/auth.guard';

@Controller('job')
@UsePipes(ValidationPipe)
@UseGuards(AuthGuard)
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() {recruiterId, ...createJobData}: CreateJobDto) {
    return this.jobService.createJob(recruiterId, createJobData );
  }

  @Get() 
  @UseGuards(AdminGuard)
  findAll() {
    return this.jobService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.jobService.remove(id);
  }
}
