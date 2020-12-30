const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://posts-clusterip-serv:4000/events', event);
  axios.post('http://comments-clusterip-serv:4001/events', event);
  axios.post('http://query-clusterip-serv:4002/events', event);
  axios.post('http://moderation-clusterip-serv:4003/events', event);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("v20");
  console.log('Listening on 4005');
});
