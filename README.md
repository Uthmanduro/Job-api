# Job Board API

## Overview
A RESTful API for a job board platform that connects job seekers with employers. Built with NestJS, MongoDB, and Prisma, featuring authentication, job listings, user profiles, and application management.

## Tech Stack
- **Backend Framework**: NestJS (with Express) + TypeScript
- **Database**: MongoDB (local/Atlas)
- **ORM**: Prisma
- **File Storage**: Cloudinary
- **API Documentation**: Swagger/OpenAPI

## Features

### Authentication & Authorization
- JWT-based authentication
- Two user roles:
  - Admin (Company): Can post, update, and delete jobs
  - User (Job Seeker): Can browse jobs and submit applications

### Job Listings
- Full CRUD operations for job postings
- Job fields include:
  - Title, company name, description
  - Location, job type (Full-time/Part-time/Contract)
  - Salary range, application deadline
- Filtering by category, location, and job type

### User Profiles
- Profile management for job seekers
- Upload resumes and profile pictures (stored in Cloudinary)
- Profile information:
  - Personal details (name, email, phone)
  - Resume URL, profile picture URL
  - Work experience and skills (optional)

### Job Applications
- Users can apply to jobs
- Admins can view all applications for their postings
- Basic application status management (reject/proceed)

### Admin Dashboard
- View all posted jobs
- Manage applications (view resumes, contact details)
- Application status updates

## API Documentation
Full API documentation available via Swagger UI:
- [Local Development](http://localhost:3000/api) (when running locally)
- [Live Documentation](#) (add your hosted link here)

## Database Schema (Prisma)
Key models include:
- User
- JobListing
- Application
- (See `prisma/schema.prisma` for full details)

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas URI)
- Cloudinary account (for file storage)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd job-board-api

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
