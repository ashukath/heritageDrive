FROM gradle:8.5-jdk21

WORKDIR /app

# Install wget for healthcheck
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

# Copy the project files
COPY . .

# Build the application
RUN gradle build -x test --no-daemon

EXPOSE 8080

# Create volume for file uploads
VOLUME /app/uploads

# Set environment variable for upload directory
ENV APP_FILE_UPLOAD_DIR=/app/uploads

CMD ["java", "-jar", "build/libs/heritagedrive-0.0.1-SNAPSHOT.jar"] 