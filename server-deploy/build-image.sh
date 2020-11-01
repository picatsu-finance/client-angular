#! /bin/bash

#ng build --prod
#cd server-deploy/
./gradlew clean build -x test
JAR_FILE=$(ls build/libs/ | grep "^serverdeploy")


docker build . --build-arg jar=build/libs/$JAR_FILE -t ezzefiohez/finance-client
docker push ezzefiohez/finance-client

echo " ######## BUILD finance ui DONE ######## "

curl  -X POST http://146.59.195.214:9000/api/webhooks/1b3fe6ec-31d6-40ab-a9d0-d0bb56bcbc7f
