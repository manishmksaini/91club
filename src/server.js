import "dotenv/config"

import express from "express"
import configViewEngine from "./config/configEngine.js"
import routes from "./routes/web.js"
import cronJobController from "./controllers/cronJobController.js"
import socketIoController from "./controllers/socketIoController.js"
import cors from 'cors'


let cookieParser = require("cookie-parser")

const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)

const port = process.env.PORT || 3000
app.use(
   cors({
     origin: "http://localhost:3003", // Allow only this frontend URL (React/Vue/Angular)
     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
     credentials: true, // Allow cookies & authorization headers
   })
 );
app.use(cookieParser())
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// setup viewEngine
configViewEngine(app)
// init Web Routes
routes.initWebRouter(app)

// Cron game 1 Phut
cronJobController.cronJobGame1p(io)

// Check xem ai connect vào sever
socketIoController.sendMessageAdmin(io)

// app.all('*', (req, res) => {
//     return res.render("404.ejs");
// });

server.listen(port, () => {
   console.log("Connected success port: " + port)
})
