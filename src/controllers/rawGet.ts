import {Document} from "../entities/Document.js";

export const rawGet = async (req, res) => {
    const rawUUID = req.params.uuid;

    try {
        const document = await Document.findOneBy({uuid: rawUUID});
        if (document === null) return res.status(404).send({ error:"Unknown UUID" })

        res.send(document.content);
    }catch (e) {
        return res.status(404).send({ error:"Unknown UUID" })
    }
}
