const express = require("express")
const app = express()
const router = require("./router")
const bodyparser = require("body-parser")
const cors = require("cors")
const debug = require("debug")("my-application");

app.use(cors())
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use("/api", router)

app.listen(3300, () => {
    // console.log("The server is running on port 3300")
    debug()
})