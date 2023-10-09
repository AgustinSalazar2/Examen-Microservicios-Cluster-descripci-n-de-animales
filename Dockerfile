# Use an official PHP-Apache runtime as a parent image
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

COPY package*.json ./

RUN npm install

# Copia tu aplicación Node.js al contenedor
COPY . .

VOLUME /volumen-de-datos

EXPOSE 3000

CMD ["npm", "run", "dev"]