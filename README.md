# Apirest Coplan
Esta apirest es de prueba para proyecto coplan
# Endpoints:

## -Usuario-

### Usuario-login
**post:** http://localhost:8081/coplan-api/usuario/login  
**body-json:**
````json
    {
        "email": "usuario1@gmail.com", 
        "password": "123456"
    }
````

### Usuario-register
**post:** http://localhost:8081/coplan-api/usuario/register  
**body-json:**
````json
    {
        "email": "usuario2@gmail.com", 
        "password": "123456"
    }
````

## -LISTA-
**get:** http://localhost:8081/list  
**descripcion:** obtener listas

**post:** http://localhost:8081/list  
**body-json:** 
````json
    { 
        "nombre": "Nueva lista" 
    }  
````

**descripcion:** crear lista

## -CARD-
**get:** http://localhost:8081/card  
**descripcion:** obtener listas  

**post:** http://localhost:8081/card  
**body-json:**
````json 
  {
        "idLIsta" : 2,
        "nomCard": "Nueva lista"
  }
````
**descripcion:** crear lista

## Run Api

node app