# Use an openjdk image to run the app
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the compiled JAR file from your local system into the container
COPY target/blog-app-apis-0.0.1-SNAPSHOT.jar blog-app-apis.jar

# Expose the port that the backend runs on (port 9092 in your case)
EXPOSE 9092

# Command to run the backend when the container starts
CMD ["java", "-jar", "blog-app-apis.jar"]
