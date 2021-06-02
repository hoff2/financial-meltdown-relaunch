#!/bin/bash

./mvnw package
docker build --build-arg JAR_FILE="target/financialmeltdownkata-0.0.1-SNAPSHOT.jar" -t fmkserver .
docker run -d -p 8080:8080 fmkserver
