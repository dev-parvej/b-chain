import express from 'express'
import bodyParser from "body-parser";
import router from "./router";
import request from "request";

const app = express();
let PORT = 5000;
const ROOT_NODE_URL = `http://localhost:${PORT}`

app.use(bodyParser.json())
app.use(bodyParser.raw())

app.use('/api/v1', router)
app.get('/', (_, res) => {
    res.status(200).send('HIs')
})

const syncChain = () => {
    request(`${ROOT_NODE_URL}/api/v1/blocks`, (error, response, body) => {
        if (!error && response.statusCode === 200) {

        }
    })
}

if (process.env.GENERATE_PEER_PORT === 'true') {
    PORT += Math.ceil(Math.random() * 1000)
}

app.listen(PORT, () => {
    console.log(`App is running in http://localhost:${PORT}`)
})
