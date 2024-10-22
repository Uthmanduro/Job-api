import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async createJob(recruiterId: string, createJobData: Prisma.JobCreateWithoutRecruiterInput) {
    return this.prisma.job.create({ 
      data: {
        ...createJobData,
        recruiterId
      }
    });
  }

  findAll() {
    return this.prisma.job.findMany({
      include: {
        applications: true
      }
    });
  }

  findOne(id: string) {
    return this.prisma.job.findUnique({
      where: { id }
    });
  }

  update(id: string, updateJobData: Prisma.JobUpdateInput) {
    return this.prisma.job.update({
      where: { id },
      data: updateJobData
    });
  }

  remove(id: string) {
    return this.prisma.job.delete({where: { id } });
  }
}
