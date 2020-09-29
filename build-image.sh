#! /bin/bash

#ng build --prod
#cd server-deploy/
#./gradlew clean build -x test
#JAR_FILE=$(ls build/libs/ | grep "^demo")


docker build -t ezzefiohez/finance-ui .
#docker push ezzefiohez/finance-ui

echo " ######## BUILD finance ui DONE ######## "

#curl  -X POST http://94.239.109.172:9000/api/webhooks/fc96fe93-45e6-4ea7-98b8-2cb65a5d4e25
