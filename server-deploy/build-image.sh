#! /bin/bash

#ng build --prod
#cd server-deploy/
./gradlew clean build -x test
JAR_FILE=$(ls build/libs/ | grep "^demo")


docker build . --build-arg jar=build/libs/$JAR_FILE -t ezzefiohez/finance-ui
docker push ezzefiohez/finance-ui

echo " ######## BUILD finance ui DONE ######## "

curl  -X POST http://94.239.109.172:9000/api/webhooks/efa399a8-6de2-4c52-8dc3-3b0ec66c1f37
