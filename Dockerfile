# Imagen base
FROM nginx:alpine

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Directorio de trabajo
WORKDIR /usr/share/nginx/html

# Copiar los archivos del proyecto al contenedor
COPY ./src /usr/share/nginx/html

# Exponer el puerto del servidor web
EXPOSE 8080