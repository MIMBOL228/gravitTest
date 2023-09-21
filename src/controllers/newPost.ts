import {Action, ActionType} from "../entities/Action.js";
import {MoreThan} from "typeorm";
import {Document} from "../entities/Document.js";
import bcrypt from "bcrypt";
import {AppDataSource} from "../data-source.js";
import process from "process";

const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,_-@!4";
    let retVal = "";
    for (let i = 0, n = charset.length; i < 32; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export const newPost = async (req, res) => {
    const ip = req.socket.remoteAddress;
    const nowDate = new Date();
    const token = req.headers.authorization;

    const actions = await Action.findBy({
        ip: ip,
        type: ActionType.create,
        createdAt: MoreThan(new Date(nowDate.getTime() - 3600000))
    });

    if (actions.length >= 5 && token !== "Bearer "+process.env.ADMIN_SECRET)
        return res.status(429).send({ "error": "Documents per hour limit reached" })

    const deleteToken = generatePassword();

    try{
        await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
            const documentRepository = await transactionalEntityManager.getRepository(Document)
            const document = new Document()
            document.deleteTokenHash = await bcrypt.hash(deleteToken, 10)
            document.content = req.body;
            await documentRepository.save(document)


            const actionRepository = await transactionalEntityManager.getRepository(Action)
            const action = new Action()
            action.type = ActionType.create
            action.ip = ip;
            await actionRepository.save(action)

            res.send({
                id: document.uuid,
                deleteToken: deleteToken
            })
        })
    }catch (e){
        res.send(500)
    }

}
