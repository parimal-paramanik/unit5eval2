const bcrypt = require("bcrypt")

const { json } = require("express")

const express = require("express")

const jwt = require("jsonwebtoken")

const UserRoutes = express.Router()

const { userModel } = require("../model/model")
const fs=require("fs")
const {authenticator}=require("../authenticatemiddle/authenticate")


UserRoutes.post("/signup", async (req, res) => {

  try {
    const { email, password, name,role} = req.body
     const ExistedUser= await userModel.findOne({email})

     if(ExistedUser){
      return  res.send("user is already signed in ")
     }

    bcrypt.hash(password, 7, async (err, hash) => {
      if (err) {
        res.send(err.message)
      }

      const user = new userModel({ name, email,role, password: hash })
       await user.save()
      res.send("New user is registered succesfully")
      
    })

  } catch (err) {
    res.send({ error: err.message })
  }
})



UserRoutes.post("/login", async (req, res) => {
  const { email, password} = (req.body)
  try {
    const user = await userModel.find({ email })

    console.log(user)
    if (user) {
      bcrypt.compare(password, user[0].password, (error, result) => {
        if (result) {
          let token = jwt.sign({ userId: user._id }, process.env.SECRETKEY, {expiresIn:"1m"})

          let  refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' });

          res.send({ "msg": "login successfull", "token": token ,"refresh_token":refreshToken})
        } else {
          res.send("Wrong credential")
        }
      })
    }else{
      res.send("please signup first")
    }
  } catch (error) {
    res.send(error)
  }
})


 UserRoutes.post("/refresh",async(req,res)=>{
  const refreshToken=req.headers.authorization.split(' ')[1]

  const BlacklistedData = JSON.parse(fs.readFileSync("./blacklistedtoken.json","utf-8"))

  if (!refreshToken || BlacklistedData.includes(refreshToken)){

    res.send( {msg:"please login first"})
  }
   jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{

    if(err){
      res.send("you have to login first")
    }else{
      const token = jwt.sign({ userId: decoded.userId}, process.env.SECRETKEY, {expiresIn:"1m"})

       res.send({msg:"user login is succesfull","token":token})
    }
   })
})



UserRoutes.get("/logout",(req,res)=>{
  
  const token=req.headers.authorization.split(' ')[1]

  try {

    if(token){
      const file=JSON.parse(
        fs.readFileSync("./blacklistedtoken.json","utf-8")
        
      );
      file.push(token)

     fs.writeFileSync("./blacklistedtoken.json",JSON.stringify(file))
     console.log(file)
     res.send("user is logged_out successfully")
    }
  } catch (error) {
    res.send(error)
  }
})


module.exports = {
  UserRoutes
}