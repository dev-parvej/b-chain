import express from 'express'
import bodyParser from "body-parser";
import router from "./router";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.raw())

app.use('/api/v1', router)
app.get('/', (_, res) => {
    res.status(200).send('HIs')
})

let PORT = 5000;

if (process.env.GENERATE_PEER_PORT === 'true') {
    PORT += Math.ceil(Math.random() * 1000)
}

app.listen(PORT, () => {
    console.log(`App is running in http://localhost:${PORT}`)
})
