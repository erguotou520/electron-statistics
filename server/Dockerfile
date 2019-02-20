# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .

# production stage
FROM node:lts-alpine
COPY --from=build-stage /app /
ENV MONGO_URI=${MONGO_URI}
ENV SERVER_HOST=${SERVER_HOST}
ENV SERVER_PORT=3333
EXPOSE 3333
CMD [ "npm", "start" ]
