const express= require("express")

const {authenticator}=require("../authenticatemiddle/authenticate")


const {Authpower}=require("../Real/AuthPower")
 const { UserRoutes}=require("../router/router")
 const AuthorisedPersonRoutes = express.Router()

 AuthorisedPersonRoutes.use(express.json())
 
//only logged in user can access products 
 AuthorisedPersonRoutes.get("/products",authenticator,(req,res)=>{
    res.send("your products are here")
  })
  

//seller can addproducts
 AuthorisedPersonRoutes.get("/addproducts",authenticator,Authpower(["user","admin","superAdmin"]),(req,res)=>{
    res.send("your report here")
  })

//seller can delete a product
 AuthorisedPersonRoutes.post("/deleteproducts",authenticator,Authpower(["seller"]),(req,res)=>{
    res.send("your report here")
  })











  module.exports={AuthorisedPersonRoutes}