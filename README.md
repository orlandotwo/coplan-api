# Apirest Coplan
Esta apirest es de prueba para proyecto coplan
# Endpoints:

##-LISTA-
get: http://localhost:8081/list
descripcion: obtener listas

post: http://localhost:8081/list
body-json: 
    {
       "nombre": "Nueva lista"
    }
descripcion: crear lista

##-CARD-
get: http://localhost:8081/card
descripcion: obtener listas

post: http://localhost:8081/card
body-json: 
    {
        "idLIsta : 2
       "nomCard": "Nueva lista"
    }
descripcion: crear lista

##Run Api
node app