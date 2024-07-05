const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

const http = require("http");
const socketio = require("socket.io");
const server  = http.createServer(app);
const io = socketio(server);

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname,"views"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


io.on("connection"  , (socket)=>{
    socket.on("send-location", function(data){
        io.emit("receive-location" , {id: socket.id, ...data});
    })
    console.log("connected to socket ");
    socket.on("disconnect", ()=>{
        io.emit("user-disconnected", socket.id);
    })
});



app.get("/" , (req, res)=>{
   res.render("index");
});



server.listen(3000 , () =>{
    console.log("App is listening to port 3000");
});
