const express = require('express')
const Datastore = require('nedb') //utilise la bdd "nedb" une fois installer par le terminal(npm install nedb)
const app = express()

app.listen(3000, () => console.log('listening at 3000'))
app.use(express.static('public')) // utiliser le dossier "public" contenant le fichier index.html
app.use(express.json({limit: '1mb'})); //permet à express de comprendre les requêtes json venant du client

const database = new Datastore('database.db'); //Création d'une bdd
database.loadDatabase(); //permet de charger la mémoire du serveur depuis la création de la bdd 

app.get('/api', (request, response) => {
    database.find({},(err,data) => {
        if (err) {
            response.end();
            return;
        }
        else {
            response.json(data)
        }
    });
});

app.post('/api', (request, response) => {
    const data = request.body; //récupère le body de la requête
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data); //insère les données dans la bdd
    response.json(data);
    });


