import { HttpException, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Job, Prisma } from '@prisma/client';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  createApplication(jobId: string, applicationData: Prisma.ApplicationUncheckedCreateWithoutJobInput) {
    return this.prisma.application.create({ data: {...applicationData, jobId }});
  }

  findApplication(applicationId: string) {
    return this.prisma.application.findUnique({where: {
      id: applicationId
    }})
  }

  findApplicationByJob(jobId: string) {
    return this.prisma.application.findMany({where: {jobId}});
  }

  update(applicationId: string, updateApplicationData: Prisma.ApplicationUpdateInput) {
    return this.prisma.application.update({
      where: { id: applicationId },
      data: updateApplicationData
    });
  }

  async remove(applicationId: string) {
    const application = await this.findApplication(applicationId)
    if (!application) throw new HttpException("Application not found", 404) 
    return this.prisma.application.delete({where: {
      id: applicationId
    }});
  }
}
