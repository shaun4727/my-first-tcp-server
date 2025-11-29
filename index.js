let net = require('net');

let count = 0, users={};

let server = net.createServer((conn) => {
    conn.write('welcome to node chat\n '+ count + ' other people are connected at this time.\n' + 'Please write your name and press enter: ');
    count++;

    conn.setEncoding('utf8');

    const broadcast = (msg, exceptMyself) => {
        for(var i in users){
            if(!exceptMyself || i != nickname){
                users[i].write(msg);
            }
        }
    }

        // broadcast(`${nickname} joined the room`);
        // broadcast(`${nickname} ${data}`,true );

    let nickname;
    conn.on('data', (data) => {
        let justJoined = false;
        data = data.replace('\r\n','');
        
        if(!nickname){
            if(users[data]){
                conn.write('nickname already in use, try again');
                return;
            }else {
                nickname = data;
                users[nickname] = conn;

                justJoined = true;

                broadcast(`${nickname} joined the room\n`);


                // for(var i in users){
                //     if(i != nickname){
                        // this condition ensures that message will be broadcasted to all other connected users 

                        // users[i].write(`\n ${nickname} joined the room \n`);
                //     }

                // }
            }
        }

        if(!justJoined){
            broadcast(`${nickname}> ${data}\n`,true);
        }
    });





    conn.on('close', ()=>{
        count--;
        broadcast(`${nickname} left the room\n`);
        delete users[nickname];
    })
})

server.listen(3000, ()=>{
    console.log('server listening on: 3000')
})