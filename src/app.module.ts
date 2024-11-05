import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { CloudinaryProvider } from './config/cloudinary.config';
import { LoggerMiddleware } from './config/logger.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JobModule,
    ApplicationModule,
    UserModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [UserService, CloudinaryProvider],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
