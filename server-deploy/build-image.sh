#! /bin/bash

#ng build --prod
#cd server-deploy/
./gradlew bootJar
JAR_FILE=$(ls build/libs/ | grep "^serverdeploy")


docker build . --build-arg jar=build/libs/$JAR_FILE -t ezzefiohez/finance-client
docker push ezzefiohez/finance-client

echo " ######## BUILD finance ui DONE ######## "

curl  -X POST http://146.59.195.214:9000/api/webhooks/b579de23-2ae3-4b61-9442-34be1951d68c
