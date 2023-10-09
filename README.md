# Examen-Microservicios-Cluster-descripcion-de-animales

### Para ejecutar los comandos abrir un terminal en la misma ubicacion donde se encuentra el archivo Dockerfile y ejecutar los siguientes comandos:

## Comando para crear la imagen
docker build -t node-app:1.0 .

## Comando para crear los contenedores
docker stack deploy -c docker-compose.yml app-animales
