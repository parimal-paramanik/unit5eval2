
const express=require("express")

const Authpower=(permittedRoles)=>{
    return(req,res,next)=>{
        const user_role= req.user.role
        if(permittedRoles.includes(user_role)){
            next()
        }else{
            res.send("you are unauthorised for this route")
        }
    }
}
module.exports={Authpower}
