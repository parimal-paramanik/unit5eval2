const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")

//authenticate token
const authenticator=async(req,res,next)=>{
    try {
         const token=req.headers.authorization.split(' ')[1]
         if(!token){
            res.send({msg:"please login first"})
         }

         const IsValid= await jwt.verify(token,process.env.SECRETKEY)
         if(!IsValid) return res.send({msg:"please login agin"})
         next()
    } catch (error) {
        res.send(error.message)
    }
}


module.exports={authenticator}