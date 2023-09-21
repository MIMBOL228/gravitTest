import {Document} from "../entities/Document.js";
import bcrypt from "bcrypt"
import * as process from "process";

export const rawDelete = async (req, res) => {
    const rawUUID = req.params.uuid;
    const deleteToken = req.headers.authorization.split(" ");

    if (deleteToken.length < 2) return res.send(400, { error:"Delete token is not defined" })

    try {
        const document = await Document.findOneBy({uuid: rawUUID});

        if (document === null) return res.send(404, { error:"Unknown UUID" })

        console.log(deleteToken[1], document.deleteTokenHash)
        const deleteTokenCompare = await bcrypt.compare(deleteToken[1], document.deleteTokenHash)
        if (deleteTokenCompare || deleteToken[0] === process.env.ADMIN_SECRET){
            await document.remove();
            res.send(201,"")
        }

        res.send(401, { error:"Invalid token" })
    }catch (e) {
        return res.send(404, { error:"Unknown UUID" })
    }
}
