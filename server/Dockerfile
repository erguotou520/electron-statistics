# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# production stage
FROM node:lts-alpine
COPY --from=build-stage /app /
EXPOSE 3333
ENV MONGO_URI=mongodb://localhost:27017/electron-statistics
ENV SERVER_HOST='0.0.0.0'
ENV SERVER_PORT=3333
CMD [ "npm", "start" ]
