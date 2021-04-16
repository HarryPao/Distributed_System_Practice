const dgram = require('dgram');
const message = Buffer.from('Hello World!');
const client = dgram.createSocket('udp4');
client.send(message, 20213, 'localhost', (err) => {
  //client.close();
});

 client.on('message', (msg, rinfo) => {
  console.log(`server send back info: ${msg} from ${rinfo.address}:${rinfo.port}`);
  client.close();
});