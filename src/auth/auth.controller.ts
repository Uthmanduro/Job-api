import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() userData: CreateAuthDto) {
    return this.authService.signIn(userData);
  }

}
