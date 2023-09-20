import "reflect-metadata"
import 'dotenv/config'
import express from 'express';
import {Document} from "./entities/Document.js";
import {AppDataSource} from "./data-source.js";

const app = express();

app.get('/', (req, res) => {
    AppDataSource.manager.find(Document).then(result => res.send(result));
});

AppDataSource.initialize()
    .then(() => {
        app.listen(8080, function() {
            console.log('running');
        });
    })
    .catch((error) => console.log(error))


