const mongoose = require('mongoose')

const product = new mongoose.Schema({
    user_id : {
        type : String
    },
    name : {
        type : String
    },
    Categories : [],
    city : {
        type : String
    },
    dealer_id : {
        type : String
    },
    weight : {
        type : Number
    },
    total_price : {
        type : Number
    }

})

const Product = mongoose.model('Product',product)

module.export = Product