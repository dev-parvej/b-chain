import { Router } from "express";
import BlockChain from "../block/block-chain";
import PubSub from "./pub-sub";
import request from "request";

export const blockChain = new BlockChain();
export const pubSub = new PubSub(blockChain)
const router = Router()

export const PORT = 5000;
const ROOT_NODE_URL = `http://localhost:${PORT}`

router.get('/blocks', (__, response) => {
    response.json(blockChain.getChain())
})
router.post('/blocks', (req, res) =>  {
    blockChain.addBlock(req.body);
    pubSub.broadcastChain()
    return res.json(blockChain.getChain());
})

export const syncChain = () => {
    return new Promise((resolve, reject) => {
        request(`${ROOT_NODE_URL}/api/v1/blocks`, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                return resolve(body);
            }
            return reject(error)
        })
    });
}

export default router;