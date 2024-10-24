import { JobType, User } from "@prisma/client"
import { IsDate, IsNotEmpty } from "class-validator"
import { Transform } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

export class CreateJobDto {
    @IsNotEmpty()
    @ApiProperty()
    title: string

    @IsNotEmpty()
    @ApiProperty()
    companyName: string

    @IsNotEmpty()
    @ApiProperty()
    jobDescription:  string

    @IsNotEmpty()
    @ApiProperty()
    location: string

    @IsNotEmpty()
    @ApiProperty()
    jobType: JobType

    @IsNotEmpty()
    @ApiProperty()
    salaryRange: string

    @IsNotEmpty()
    @ApiProperty()
    category: string  
    
    @IsNotEmpty()
    @ApiProperty()
    @Transform(({ value }) => new Date(value))
    applicationDeadline: Date

    @IsNotEmpty()
    @ApiProperty()
    recruiterId: string
}
