import { Router } from "express";
import BlockChain from "./block/block-chain";

const blockChain = new BlockChain();
const router = Router()

router.get('/blocks', (__, response) => {
    response.json(blockChain.getChain())
})
router.post('/blocks', (req, res) =>  {
    blockChain.addBlock(req.body);

    return res.json(blockChain.getChain());
})

export default router;