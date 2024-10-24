import {
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  Req
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard, AdminGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
