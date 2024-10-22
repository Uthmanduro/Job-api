import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { CloudinaryProvider } from './config/cloudinary.config';

@Module({
  imports: [JobModule, ApplicationModule, UserModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, UserService, CloudinaryProvider],
})
export class AppModule {}
