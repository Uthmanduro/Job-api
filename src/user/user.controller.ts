import {
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  UseInterceptors, 
  UploadedFiles,
  BadRequestException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard, AdminGuard } from 'src/auth/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,) {}

  @Post('signup')
  // @UseInterceptors(FileFieldsInterceptor([
  //   { name: 'resumeUrl', maxCount: 1 },
  //   { name: 'profilePicUrl', maxCount: 1 },
  // ]))
  async create(
    @Body() createUserDto: CreateUserDto, 
    // @UploadedFiles() files: { resumeUrl?: Express.Multer.File[], profilePicUrl?: Express.Multer.File[] }
  ) {
    // const result = await this.userService.uploadImages(files)
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
