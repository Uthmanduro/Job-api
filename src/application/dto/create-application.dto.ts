import { ApiProperty } from "@nestjs/swagger"
import { ApplicationStatus } from "@prisma/client"

export class CreateApplicationDto {
    @ApiProperty()
    coverLetter: string

    @ApiProperty()
    resumeUrl: string

    @ApiProperty()
    status: ApplicationStatus

    @ApiProperty()
    applicantId: string
}
