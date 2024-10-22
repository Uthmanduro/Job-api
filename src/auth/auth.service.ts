import { HttpException, Injectable,  } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signIn(userData: CreateAuthDto) {
    const user = await this.prisma.user.findUnique({ where: { email: userData.email }});
    if (!user) throw new HttpException('Email or Password deos not exists', 404);
    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) throw new HttpException('Email or Password deos not exists', 404);

    const payload = {sub: user.id, email: user.email, role: user.role}
    const {password, ...userInfo} = user
    
    return {
      access_token: await this.jwtService.signAsync(payload),
      userInfo
    };
  }
}
