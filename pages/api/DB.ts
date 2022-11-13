import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'containers-us-west-119.railway.app',
    database: 'railway',
    password: process.env.RAILWAY_PWD,
    port: 7129,
  })
  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

export default client;