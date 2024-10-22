import { Role } from "@prisma/client";
import { IsEmail, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    name:            string
    @IsEmail()
    email:           string
    password:        string
    phoneNumber:     string
    resumeURL:       string
    profilePicURL:   string
    workExperience:  string
    role:            Role
}
