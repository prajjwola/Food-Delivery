const mongoose = require('mongoose');

const dbConnect = async()=>{
    try{
        const connection= await mongoose.connect('mongodb://localhost:27017/Food delivery');
        if(connection) console.log("connected to mongodb")
    }catch(err){
        console.log(err)
        process.exit()
    }
}


module.exports = dbConnect