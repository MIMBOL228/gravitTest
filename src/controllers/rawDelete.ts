import {Document} from "../entities/Document.js";
import bcrypt from "bcrypt"
import * as process from "process";

export const rawDelete = async (req, res) => {
    const rawUUID = req.params.uuid;
    const deleteToken = req.headers.authorization.split(" ");

    if (deleteToken.length < 2) return res.status(400).send({ error:"Delete token is not defined" })

    try {
        const document = await Document.findOneBy({uuid: rawUUID});

        if (document === null) return res.status(404).send({ error:"Unknown UUID" })

        const deleteTokenCompare = await bcrypt.compare(deleteToken[1], document.deleteTokenHash)
        if (deleteTokenCompare || deleteToken[1] === process.env.ADMIN_SECRET){
            await document.remove();
            return res.send(201,"")
        }

        res.status(401).send({ error:"Invalid token" })
    }catch (e) {
        return res.status(404).send({ error:"Unknown UUID" })
    }
}
