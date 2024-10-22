import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v2 as cloudinary} from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';


@Injectable()
export class UserService {
  constructor (private prisma: PrismaService) {}

  async hashpassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async uploadImage(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }).end(file.buffer);
    });
  }

  // For multiple files
  async uploadImages(files: Express.Multer.File[]) {
    const uploadPromises = files.map(file => this.uploadImage(file)); 
    return Promise.all(uploadPromises); 
  }

  async create(userData: Prisma.UserCreateInput) {
    const emailExists = await this.prisma.user.findUnique({where: {email: userData.email}})
    if (emailExists) throw new HttpException("User already exists", HttpStatus.BAD_REQUEST)
    const { password, ...user } = userData;
    const hashedPassword = await this.hashpassword(password);
    return this.prisma.user.create({data: {password: hashedPassword, ...user}});
  }


  findAll() {
    return this.prisma.user.findMany({
      include: {
        jobs: true,
        applications: true
      }
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: {id}});
  }

  update(id: string, updateUserData: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserData });
  }

  remove(id: string) {
    return this.prisma.user.delete({where: {id} });
  }
}
