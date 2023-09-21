import {Document} from "../entities/Document.js";

export const rawGet = async (req, res) => {
    const rawUUID = req.params.uuid;
    const document = await Document.findOneBy({uuid: rawUUID});

    if (document === null) return res.send(404, { error:"Unknown UUID" })

    res.send(document.content);
}
