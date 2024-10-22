import { ApplicationStatus } from "@prisma/client"

export class CreateApplicationDto {
    coverLetter: string
    resumeUrl: string
    status: ApplicationStatus
    applicantId: string
}
