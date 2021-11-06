import { Router } from "express";
import BlockChain from "./block/block-chain";
import PubSub from "./pub-sub";

const blockChain = new BlockChain();
const pubSub = new PubSub(blockChain)
const router = Router()

router.get('/blocks', (__, response) => {
    response.json(blockChain.getChain())
})
router.post('/blocks', (req, res) =>  {
    blockChain.addBlock(req.body);
    pubSub.broadcastChain()
    return res.json(blockChain.getChain());
})

export default router;