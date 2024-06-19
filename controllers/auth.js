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

        card.color = 'green';

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

module.exports = {
    getList,
    setList,
    getCard,
    setCard
}