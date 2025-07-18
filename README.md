# Shorten URL with NestJS

A URL shortening service built with NestJS framework and PostgreSQL database using Prisma ORM.

## Description

This project provides a simple and efficient URL shortening service that allows users to convert long URLs into shorter, more manageable links. It includes features like custom short codes, click tracking, and URL management.

## Features

- ✨ Shorten long URLs with auto-generated or custom short codes
- 📊 Click tracking and analytics
- 🔗 Redirect to original URLs
- 📋 List all shortened URLs
- 🗑️ Delete URLs
- 🔧 RESTful API endpoints
- 🛡️ Input validation with class-validator
- 🗄️ PostgreSQL database with Prisma ORM
- 🌐 CORS enabled

## Technologies

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: class-validator, class-transformer
- **Testing**: Jest

## Installation

```bash
$ npm install
```

## Database Setup

1. Set up your PostgreSQL database
2. Copy the environment variables:
```bash
cp .env.example .env
```

3. Update the `DATABASE_URL` in [.env](.env) file

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Generate Prisma client:
```bash
npx prisma generate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints

### POST /api/shorten
Create a shortened URL

**Request Body:**
```json
{
  "originalUrl": "https://example.com/very/long/url",
  "customCode": "mycode" // optional
}
```

**Response:**
```json
{
  "id": 1,
  "shortCode": "abc123",
  "originalUrl": "https://example.com/very/long/url",
  "clickCount": 0,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "shortUrl": "http://localhost:3000/abc123"
}
```

### GET /:shortCode
Redirect to the original URL and increment click counter

### GET /api/urls
Get all shortened URLs

**Response:**
```json
[
  {
    "id": 1,
    "shortCode": "abc123",
    "originalUrl": "https://example.com/very/long/url",
    "clickCount": 5,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/stats/:shortCode
Get statistics for a specific short URL

**Response:**
```json
{
  "id": 1,
  "shortCode": "abc123",
  "originalUrl": "https://example.com/very/long/url",
  "clickCount": 5,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "shortUrl": "http://localhost:3000/abc123"
}
```

### DELETE /api/urls/:shortCode
Delete a shortened URL

**Response:**
```json
{
  "message": "URL deleted successfully"
}
```

## Project Structure

```
src/
├── app.controller.ts          # Main app controller
├── app.module.ts             # Main app module
├── app.service.ts            # Main app service
├── main.ts                   # Application entry point
├── prisma/                   # Prisma configuration
│   ├── prisma.module.ts      # Prisma module
│   └── prisma.service.ts     # Prisma service
└── urls/                     # URLs feature module
    ├── dto/                  # Data transfer objects
    ├── entities/             # Entity definitions
    ├── urls.controller.ts    # URLs controller
    ├── urls.module.ts        # URLs module
    └── urls.service.ts       # URLs service
```

## Key Components

- **[UrlsController](src/urls/urls.controller.ts)**: Handles HTTP requests for URL operations
- **[UrlsService](src/urls/urls.service.ts)**: Contains business logic for URL management
- **[PrismaService](src/prisma/prisma.service.ts)**: Database connection and operations
- **[CreateUrlDto](src/urls/dto/create-url.dto.ts)**: Validation for URL creation
- **[UrlResponseDto](src/urls/dto/url-reponse.dto.ts)**: Response format for URL data

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `BASE_URL`: Base URL for the application (default: http://localhost:3000)
- `PORT`: Port number (default: 3000)
- `TZ`: Timezone (default: Asia/Bangkok)

## Database Schema

The application uses a single `Url` model defined in [prisma/schema.prisma](prisma/schema.prisma):

- `id`: Auto-incrementing primary key
- `shortCode`: Unique short code for the URL
- `originalUrl`: The original long URL
- `clickCount`: Number of times the URL has been accessed
- `createdAt`: Timestamp when the URL was created
- `updatedAt`: Timestamp when the URL was last updated

## License

This project is [MIT licensed](LICENSE).