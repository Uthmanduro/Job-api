import {
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard, AdminGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService,) {}

  @Post('signup')
  async create(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @Post('uploadProfilePic')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
    const uploadedFile = await this.userService.uploadFile(file)
    const id = request['user'].sub;
    return this.userService.update(id, {"profilePicUrl": uploadedFile.secure_url});
  }

  @Post('uploadResume')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadResume(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
    const uploadedFile = await this.userService.uploadFile(file)
    const id = request['user'].sub;
    return this.userService.update(id, {"resumeUrl": uploadedFile.secure_url});
  }

  @Get('all')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, AdminGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  findOne(@Req() request: Request) {
    const id = request['user'].sub;
    return this.userService.findOne(id);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    const id = request['user'].sub;
    return this.userService.update(id, updateUserDto);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  remove(@Req() request: Request) {
    const id = request['user'].sub;
    return this.userService.remove(id);
  }
}
