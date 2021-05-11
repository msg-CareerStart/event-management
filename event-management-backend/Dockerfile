FROM maven:3.8.1-openjdk-11 as build
WORKDIR /home/event-management-backend
COPY . ./
RUN mvn clean package spring-boot:repackage

FROM openjdk:11-jre
COPY --from=build /home/event-management-backend/target/*.jar /home/*.jar
CMD java -jar /home/*.jar