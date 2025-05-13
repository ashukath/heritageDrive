FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

# Install gradle
RUN apk add --no-cache gradle

# Copy only the build files first to cache dependencies
COPY build.gradle settings.gradle ./
COPY gradle gradle/
RUN gradle dependencies --no-daemon

# Now copy source code and build
COPY src src/
RUN gradle build -x test --no-daemon

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"] 