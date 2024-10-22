import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard, AdminGuard } from './auth.guard';

@Module({
  imports: [ 
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '15m' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, AdminGuard],
  exports: [AuthService, AuthGuard, AdminGuard]
})
export class AuthModule {}
