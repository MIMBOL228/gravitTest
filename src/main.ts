import "reflect-metadata"
import 'dotenv/config'
import express from 'express';
import {AppDataSource} from "./data-source.js";
import {newPost} from "./controllers/newPost.js";
import {rawGet} from "./controllers/rawGet.js";
import {rawDelete} from "./controllers/rawDelete.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.text({type:"text/plain", limit: '2mb'}));

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


