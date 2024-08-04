FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production

EXPOSE 5000

CMD ["npm", "run", "serve"]