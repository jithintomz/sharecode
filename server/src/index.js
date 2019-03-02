const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http)
const dotenv = require('dotenv')
dotenv.config()

io.on('connection',(socket)=> {
    socket.emit('this',{name : 'jithin'})
    socket.on('valueChange', (data)=>{
        socket.broadcast.emit('valueChanged', data)
    
    })
})

const PORT = process.env.SERVER_PORT

app.get('/', (req,res) => {
    res.send("Hello world")
})

http.listen(PORT, () =>{
    console.log(`Serving at ${PORT}`)
})