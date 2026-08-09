const mongoose = require("mongoose")

const connectDB = async ()=>{

    console.log("connecting");
    
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected sucessfully");
        
    }
    catch(err){
        console.error("An error occured",err);
        
    }
}
module.exports = connectDB