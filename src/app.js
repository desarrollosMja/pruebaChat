import express from "express"
import { Server as IOServer } from "socket.io"
import __dirname from "./dirname.js"
import "dotenv/config"
import { ExpressHandlebars as hbs } from "express-handlebars"
import path from "path"

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Listening in http://localhost:${PORT}`))
const io = new IOServer(server)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+"/public"))

// app.engine("hbs", hbs({
//     extname: ".hbs",
//     layoutsDir: "./public/views/handlebars",
//     defaultLayout: "index"
// }))

// app.set("views", path.join(__dirname,"views", "handlebars"))
// app.set("view engine", "hbs")

// app.get("/", (req,res) => {
//     res.sendFile(__dirname+"/public/index.html")
// })

const log = []
io.on("connection", socket => {
    console.log("User connected")
    socket.on("mensaje", data =>{
        log.push(data)
        io.emit("log", log)
    })
})



