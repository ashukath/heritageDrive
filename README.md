# Heritage Drive

A full-stack application for a professional driver service, featuring testimonial management and a beautiful landing page.

## Project Structure

```
heritage-drive/
├── backend/                # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   └── build.gradle
├── frontend/              # React Application
│   ├── src/
│   ├── public/
│   └── package.json
├── build.gradle
└── settings.gradle
```

## Prerequisites

- Java 17
- Node.js 18+ and npm
- PostgreSQL 15+
- Gradle 8.5+

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
../gradlew build
```

3. Run the application:
```bash
../gradlew bootRun
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

### Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE heritage_drive;
```

2. Update the database configuration in `backend/src/main/resources/application.properties` if needed.

## Features

1. Landing Page
   - Beautiful intro with photos
   - "Why ride with a 30-year veteran" section
   - Call to Action: "Submit Your Testimonial"

2. Testimonial Submission
   - Form with name, message, rating, and image upload
   - REST API integration with backend

3. Backend API
   - POST /api/testimonials - Submit new testimonials
   - GET /api/testimonials - Retrieve testimonials
   - File system storage for images
   - PostgreSQL database for data persistence

## Development

- Backend API: http://localhost:8080
- Frontend: http://localhost:3000
- API Documentation: http://localhost:8080/swagger-ui.html (coming soon)

## Testing

### Backend Tests
```bash
cd backend
../gradlew test
```

### Frontend Tests
```bash
cd frontend
npm test
``` 