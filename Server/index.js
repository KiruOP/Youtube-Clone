import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import videoroutes from './Routes/video.js';
import userroutes from "./Routes/User.js";
import path from 'path';
import commentroutes from './Routes/comment.js';
import userpointsroutes from "./Routes/userPointsRoutes.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config()
const app = express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "DELETE"],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
});

// app.use(cors())

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PATCH','DELETE'],
    allowedHeaders: ['Content-Type','Authorization']
}));

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use('/uploads', express.static(path.join('uploads')))

app.get('/', (req, res) => {
    res.send("K-Tube is working")
})


app.use(bodyParser.json())
app.use('/user', userroutes)
app.use('/video', videoroutes)
app.use('/comment', commentroutes)
app.use('/userpoints', userpointsroutes)
const PORT = process.env.PORT || 5353

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('call-user', (data) => {
        socket.broadcast.emit('call-accepted', data.signalData);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on Port http://localhost:${PORT}`);
})

const DB_URL = process.env.DB_URL
mongoose.connect(DB_URL).then(() => {
    console.log("Mongodb Database connected")
}).catch((error) => {
    console.log(error)
})