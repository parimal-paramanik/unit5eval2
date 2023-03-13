

const {UserRoutes} = require("./router/router")
const express = require("express")

const {connection}=  require("./config/db")
const {AuthorisedPersonRoutes}=require("./authorized/authPerson")
const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to the home page")
})
app.use("/user",UserRoutes)
app.use("/person",AuthorisedPersonRoutes)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to mongodb atlas")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is awake at port no ${process.env.port}`)
})
