# API Coperex Interfer

API de la empresa Coperex para gestionar la incorporación de nuevos socios y empresas en Interfer

## Variables de Entorno

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
PORT=<tu_puerto_del_servidor>

URI_MONGO=<tu_cadena_de_conexión_mongodb>

SECRET_KEY=<tu_secreto_jwt>
```

## Base de datos

Los documentos de la base de datos se encuentran en `configs/data/` podra encontrar 20 documentos listos para usar en MongoDB Compass.

## Postman

Podra encontrar los endpoints de la API en la carpetas `configs/endpoints/` se encuentra la colección lista para usar en Postman.

## Excel

Para crear los documentos Excel se utilizo la dependencia `excel4node`, solo basta con instalar las dependencias de la API y al ejecutar el controlador se crean los documentos Excel.

## Usuarios

Para esta API se crea un usuario default con el role ADMIN, por medio de este se maneja toda la API siempre cumpliendo con los requerimientos, al ejecutar por primera vez el proyecto en consola se muestra las credenciales del usuario.

## Documentación Swagger

Al ejecutar el proyecto se puede acceder a la documentación de los endpoints de la API, utilizando la URL:
```
http://127.0.0.1:3004/api-docs
```