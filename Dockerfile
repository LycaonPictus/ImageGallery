# Imagen base
FROM nginx:alpine

# Directorio de trabajo
WORKDIR /usr/share/nginx/html

# Copiar los archivos del proyecto al contenedor
COPY ./src /usr/share/nginx/html

# Exponer el puerto del servidor web
EXPOSE 8080