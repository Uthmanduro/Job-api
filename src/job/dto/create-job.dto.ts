import { JobType, User } from "@prisma/client"
import { IsDate, IsNotEmpty } from "class-validator"
import { Transform } from "class-transformer"

export class CreateJobDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    companyName: string

    @IsNotEmpty()
    jobDescription:  string

    @IsNotEmpty()
    location: string

    @IsNotEmpty()
    jobType: JobType

    @IsNotEmpty()
    salaryRange: string

    @IsNotEmpty()
    category: string  
    
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    applicationDeadline: Date

    @IsNotEmpty()
    recruiterId: string
}
