# Heritage Drive

A modern web application for preserving and sharing cultural heritage through stories and testimonials.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Git

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/heritagedrive.git
cd heritagedrive
```

2. Create environment file:
```bash
# Copy the example env file and modify it with your secure values
cp .env.example .env
```

3. Update the `.env` file with secure passwords and configurations:
```env
POSTGRES_DB=heritagedrive
POSTGRES_USER=your_secure_username
POSTGRES_PASSWORD=your_secure_password
SPRING_DATASOURCE_USERNAME=your_secure_username
SPRING_DATASOURCE_PASSWORD=your_secure_password
SPRING_PROFILES_ACTIVE=prod
REACT_APP_API_URL=http://localhost:8080/api
```

4. Build and start the containers:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

## 🏗️ Project Structure

```
heritagedrive/
├── frontend/          # React frontend application
├── backend/          # Spring Boot backend application
├── docker-compose.yml # Docker composition file
└── .env              # Environment variables (create from .env.example)
```

## 🔒 Security Best Practices

1. Environment Variables
   - Never commit the `.env` file
   - Use strong, unique passwords
   - Change default credentials in production

2. Docker Volumes
   - Backend data: `/app/data`
   - Frontend node_modules: `/app/node_modules`
   - PostgreSQL data: `/var/lib/postgresql/data`

3. Container Security
   - Services run with restart policy
   - Database is only accessible within Docker network
   - Minimal base images used (alpine)

## 🛠️ Development

### Running in Development Mode

1. Backend (Spring Boot):
```bash
cd backend
./gradlew bootRun
```

2. Frontend (React):
```bash
cd frontend
npm install
npm start
```

### Making Changes

1. Frontend changes:
   - Edit files in `frontend/src`
   - Changes will hot-reload

2. Backend changes:
   - Edit files in `backend/src`
   - Application will auto-restart

## 📦 Production Deployment

1. Update environment variables:
   - Set strong passwords
   - Configure proper API URLs
   - Enable production mode

2. Build and deploy:
```bash
docker-compose -f docker-compose.yml up -d --build
```

3. Monitor logs:
```bash
docker-compose logs -f
```

## 🧹 Maintenance

### Backup

1. Database backup:
```bash
docker-compose exec db pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup.sql
```

### Cleanup

1. Stop and remove containers:
```bash
docker-compose down
```

2. Remove volumes (caution - this deletes all data):
```bash
docker-compose down -v
```

## 📝 License

[Your chosen license]

## 👥 Contributing

[Your contribution guidelines] 