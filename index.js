const express = require('express');
//const cors = require("cors")
const app = express();

app.use(express.json());
//app.use(cors());
app.listen( process.env.PORT ||  3000);


app.get('/', function(req, res){
    console.log("Acessando /");
    res.send('Hello world')});

/*
  Servidor propriamente dito
*/

const suppliers = [
    {id: 0, nome: "Val", cnpj : "1324", telefone: "123456789", email: "qualquer coisa", localizacao: "Mirassol"},
    {id: 1, nome: "Valterci", cnpj : "5678", telefone: "123456789", email: "qualquer coisa", localizacao: "Mirassol"}
]

const endpoint = "/suppliers";

app.get(endpoint, function(req, res){
    res.send(suppliers.filter(Boolean));
});

app.get(`${endpoint}/:id`, function(req, res){
    const id = req.params.id;
    const supplier = suppliers[id];

    if (!supplier){
        res.send("{}");
    } else {
        res.send(supplier);
    }   
});

app.post(endpoint, (req, res) => {
    const supplier = {
        id : suppliers.length,
        nome : req.body["nome"],
        cnpj : req.body["cnpj"],
        telefone: req.body["telefone"],
        email: req.body["email"],
        localizacao: req.body["localizacao"]
    };
    suppliers.push(supplier);
    res.send("1");

});

app.put(`${endpoint}/:id`, (req, res) =>{
    const id = parseInt(req.params.id);
    const supplier = {
        id : id,
        nome : req.body["nome"],
        cnpj : req.body["cnpj"],
        telefone: req.body["telefone"],
        email: req.body["email"],
        localizacao: req.body["localizacao"]
    };

    suppliers[id] = supplier;
    res.send("1");

});

app.delete(`${endpoint}/:id`, (req, res) => {
    const id = req.params.id;
    delete suppliers[id];
    res.send("1");

});


