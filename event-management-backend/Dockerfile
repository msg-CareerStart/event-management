FROM maven:3.8.1-openjdk-11 as build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src/ /build/src/
RUN mvn clean package -DskipTests spring-boot:repackage

FROM openjdk:11-jre
COPY --from=build /build/target/*.jar /app/*.jar
CMD java -jar /app/*.jar