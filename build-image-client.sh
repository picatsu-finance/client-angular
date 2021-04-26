
#npm run build:prod

docker build  -t ezzefiohez/finance-ui .
docker push ezzefiohez/finance-ui

echo " ######## BUILD finance ui DONE ######## "

curl  -X POST http://146.59.195.214:9000/api/webhooks/3f44e953-5cbe-47d5-b25d-c911f0af1ddd
