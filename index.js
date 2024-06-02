const express = require("express")
require("dotenv").config()
require("./createDatabase")
const app = express()
const port = process.env.PORT || 8080
// const {orders , createOrders } = require("./routes/route")
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')   
app.use(require("./Routes/route"))
app.listen(port , ()=>{
    console.log("App started on port " , port)
})
