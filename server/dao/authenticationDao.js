const userModels = require('../models/User');


const createUser = async(data)=>{
    try{
        const user = new userModels(data);

        const savedUser = await user.save();
    
        return savedUser;
    }catch(error){
        throw error
    }
  
}

const checkUser = async(email)=>{
    try{
        const isExist = await userModels.findOne({email : email})
        return isExist
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    createUser,
    checkUser
}