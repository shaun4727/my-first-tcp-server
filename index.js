let net = require('net');

let count = 0, users={};

let server = net.createServer((conn) => {
    conn.write('welcome to node chat\n '+ count + ' other people are connected at this time.\n' + 'Please write your name and press enter');
    count++;

    conn.setEncoding('utf8');

    let nickname;
    conn.on('data', (data) => {
        data = data.replace('\r\n','');
        
        if(!nickname){
            if(users[data]){
                conn.write('nickname already in use, try again');
                return;
            }else {
                nickname = data;
                users[nickname] = conn;

                for(var i in users){
                    if(i != nickname){
                        // this condition ensures that message will be broadcasted to all other connected users 

                        users[i].write(`\n ${nickname}${data} \n`);
                    }

                }
            }
        }
    });



    conn.on('close', ()=>{
        count--;
    })
})

server.listen(3000, ()=>{
    console.log('server listening on: 3000')
})