const mongoose = require('mongoose')

const user = new mongoose.Schema({
    
    full_name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    city : {
        type : String
    },
    country : {
        type : String
    },
    state : {
        type : String
    },
    mobile_number : {
        type : Number
    },
    location : {
        type : String
    }
})


const User = mongoose.model('User',user)

module.exports = User