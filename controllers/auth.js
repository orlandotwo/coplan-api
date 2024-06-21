const { request, response } = require("express");
const { readDataFile, writeDataFile } = require("../helpers/tools");

const getList = (req = request, res = response) =>{
   
    const bdUrls = readDataFile();

    console.log(bdUrls);

    res.status(200).send(bdUrls);
}
const setList = (req = request, res = response) =>{

    const newList = req.body;

    //console.log(newList);

    let data = readDataFile();

    console.log(data)

    // Obtener nuevo ID

    if (data.length === 0) {
        newList.id = 0;
    } else {
        const maxId = Math.max(...data.map(item => item.id));
        newList.id = maxId + 1;
    }

    data.push(newList);

    writeDataFile(data);

    res.status(200).send({
        status: 'success', data: newList
    });
}

const putList = (req = request, res = response) => {
    const { id, nombre } = req.body;
    
    console.log('req.body', req.body);
    console.log('-------->', id, nombre);
    
    let db = readDataFile();

    const listIndex = db.findIndex(list => list.id == id);
    if (listIndex === -1) {
        return res.status(404).send({ status: 'error', data: 'Lista no encontrada' });
    }
    db[listIndex].nombre = nombre;
    writeDataFile(db);

    res.status(200).send({ status: 'success', data: 'Lista actualizada' });
}

const deleteList = (req = request, res = response) => {
    console.log('req.params',req.params)
    const { idList, idCard } = req.params; 

    console.log('-------->',idList,idCard);
    let db = readDataFile(); 

    const listIndex = db.findIndex(list => list.id == idList);
    if (listIndex === -1) {
        return res.status(404).send({ status: 'error', data: 'Lista no encontrada' });
    }
    db.splice(listIndex, 1);

    writeDataFile(db);

    res.status(200).send({ status: 'success', data: 'Lista eliminada' });
}

//------------------------CARD------------------------
const getCard = (req = request, res = response) =>{

    const { id } = req.params;

}

const setCard = (req = request, res = response) =>{
    /*
        newCard = {
            idLista: 0,
            nomCard: 'custom' 
        }
    */
    const {idLista, nomCard=''} = req.body;

    let card;
    let resp = {status: '', data: {} };
    let data = readDataFile();
    //console.log('data -> ',data);
    let list = data.find(list => list.id === parseInt(idLista));

    if (list) {
        if(list.listCard){
            const maxId = Math.max(...list.listCard.map(card => card.id));
            card = {id: (maxId + 1), nombre: (nomCard ==''?`Custom ${maxId+1}`:nomCard)};
            
        }else{
            card = {id: 0, nombre:(nomCard ==''?`Custom 0`:nomCard)};
            list.listCard = [];
        }

        card.prioridad = 'Baja';

        list.listCard.push(card);
        console.log('list -> ', list)
        data = data.map(listItem => listItem.id === list.id ? list : listItem);
        writeDataFile(data);

        resp.status = 'success';
        resp.data = card;
        res.status(200).send(resp);
    }else{
        resp.status = 'error';
        resp.data = 'List not found';
        return res.status(404).send(resp);
    }
    
}

const putCard = (req = request, res = response) =>{
    /*
    data = { 
        "idList": 0,
        "card": {
            "id": 2,
            "nombre": "Custom 2",
            "prioridad": "Baja",
            "descripcion": ""
    }
    */
    const data = req.body;

    console.log(data);
    let resp = {status: '', data: {} };
    let db = readDataFile();
    // console.log('db 0-> ',db[0].listCard[0])
    // console.log('db 1-> ',db[0].listCard[0])
    // console.log('db 2-> ',db[0].listCard[0]);
    try {
        let list = db.find(list => list.id === parseInt(data.idList));
        if(list && list.listCard){
            let index = list.listCard.findIndex(card => card.id === data.card.id);
            if(index !== -1){
                db = db.map(listItem => listItem.id === list.id ? {...list, listCard: [...list.listCard.slice(0, index), data.card, ...list.listCard.slice(index+1)]}: listItem);
                writeDataFile(db);
            }
        }
        
        resp.status = 'success';
        resp.data = 'Card modificada';
        res.status(200).send(resp);

    } catch (error) {
        resp.status = 'error';
        resp.data = 'List not found';
        res.status(404).send(resp);
    }
   
    //console.log('card modificada -> ',list.listCard);
}

const deleteCard = (req = request, res = response) => {
    console.log('req.params',req.params)
    const { idList, idCard } = req.params; // Obtener idList y idCard de los parámetros de la solicitud
    /*
     const data = {
        idList:1,
        idCard:2
      }
    */
   console.log('-------->',idList,idCard);
    let db = readDataFile(); // Leer los datos del archivo JSON

    // Buscar la lista por idList
    const listIndex = db.findIndex(list => list.id == idList);
    if (listIndex === -1) {
        return res.status(404).send({ status: 'error', data: 'Lista no encontrada' });
    }

    // Buscar la tarjeta por idCard en la lista encontrada
    const cardIndex = db[listIndex].listCard.findIndex(card => card.id == idCard);
    if (cardIndex === -1) {
        return res.status(404).send({ status: 'error', data: 'Tarjeta no encontrada' });
    }

    // Eliminar la tarjeta de la lista
    db[listIndex].listCard.splice(cardIndex, 1);

    // Escribir los datos actualizados de vuelta al archivo JSON
    writeDataFile(db);

    // Responder con éxito
    res.status(200).send({ status: 'success', data: 'Card eliminada' });
}
module.exports = {
    getList,
    setList,
    putList,
    deleteList,
    getCard,
    setCard,
    putCard,
    deleteCard,
}