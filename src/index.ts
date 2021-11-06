import express from 'express'
import bodyParser from "body-parser";
import router from "./router";

const app = express();
const port = 5000;

app.use(bodyParser.json())
app.use(bodyParser.raw())

app.use('/api/v1', router)
app.get('/', (_, res) => {
    res.status(200).send('HIs')
})

app.listen(port, () => {
    console.log(`App is running in http://localhost:${port}`)
})
