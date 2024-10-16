const mongoose = require("mongoose")
module.exports.connectionDB  = () =>{
    mongoose.connect(process.env.DB_CONNECT_STRING).then(()=>{
        console.log('MongoDb connect successfully')
    })
    .catch((err)=>{
        console.error('MongoDB connection error:',err)
    })
}