import "reflect-metadata"
import 'dotenv/config'
import express from 'express';
import {Document} from "./entities/Document.js";
import {AppDataSource} from "./data-source.js";
import {newPost} from "./controllers/newPost.js";
import {rawGet} from "./controllers/rawGet.js";
import {rawDelete} from "./controllers/rawDelete.js";

const app = express();

app.get('/', (req, res) => {
    AppDataSource.manager.find(Document).then(result => res.send(result));
});

app.post("/new/", newPost);
app.get("/raw/:uuid/", rawGet);
app.delete("/raw/:uuid/", rawDelete);

AppDataSource.initialize()
    .then(() => {
        app.listen(8080, function() {
            console.log('running');
        });
    })
    .catch((error) => console.log(error))


