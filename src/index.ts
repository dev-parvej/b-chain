import express from 'express';
import bodyParser from 'body-parser';
import router, { blockChain, PORT, syncChain } from './app/router';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use('/api/v1', router);
app.get('/', (_, res) => {
  res.status(200).send('HIs');
});

let generated_port = PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
  generated_port += Math.ceil(Math.random() * 1000);
}

app.listen(generated_port, async () => {
  console.log(`App is running in http://localhost:${generated_port}`);
  if (generated_port === PORT) {
    return;
  }
  try {
    const result = JSON.parse(await syncChain() as string);
    if (result.length === 1) {
      return;
    }
    blockChain.setChain(result);
  } catch (e) {
    console.log(e);
  }
});
