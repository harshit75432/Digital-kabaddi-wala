const bcrypt  = require('bcrypt')
const httpStatus = require('../constants/http-status-constant')
const authenticationDao = require('../dao/authenticationDao')



const createUser = async (req,res) => {
    try{
        const {body} = req 
        let isUserExist = await authenticationDao.checkUser(body.email)
        if(!isUserExist){
            bcrypt.hash(body.password, 10, async function(err, hash) {
                if(!err){
                    let data = {
                        full_name : body.name,
                        email : body.email,
                        password : hash
                    }
                   let user = await authenticationDao.createUser(data) 
                   res.status(httpStatus.OK).send({message:'Successfully create your account'})
                }
            })
            
        }else{
            res.status(httpStatus.OK).send({message:'Already Exist',userStatus : true})
        }
       
    }catch(error){
        console.log(error)
    }
}


const login = async(req,res)=>{
    try{
        const {body} = req
        const isExist = await authenticationDao.checkUser(body.email)
        console.log(isExist)
        if(isExist){
            bcrypt.compare(body.password, isExist.password, function(err, result) {
                if(result){
                    res.status(httpStatus.OK).send({message:'Wellcome to the home page' ,loginStatus : true})
                }else{
                   res.status(httpStatus.OK).send({message:'Wrong password' ,loginStatus : false})
                }
            })
        }else{
            res.status(httpStatus.OK).send({message:'User not exist plase create your account' ,loginStatus : false})
        }


    }catch(error){
        console.log(error)
    }
}


module.exports ={
    createUser,
    login
}