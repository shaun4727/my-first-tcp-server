let net = require('net');
let server = net.createServer((conn) => {
    console.log('new connection')
})