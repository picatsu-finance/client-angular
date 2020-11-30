FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
RUN ls -al
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:prod -- --prod

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

