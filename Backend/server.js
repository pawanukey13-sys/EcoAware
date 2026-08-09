const app = require("./src/app")
const dns = require("dns")
dns.setServers(['8.8.8.8','8.8.4.4'])
const connectDB = require("./src/databse/db")
const cors = require('cors')
require("dotenv").config();
connectDB()

app.listen(4000,()=>{

    console.log("server running on port 4000");
    
})