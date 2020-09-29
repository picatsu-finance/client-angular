FROM nginx:alpine
COPY ./server-deploy/src/main/resources/static/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
