import express from 'express'
import sequelize from './config/db.js'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'

import bookRouter from "./routes/bookRoutes.js"
import authorRouter  from './routes/authorRoutes.js'
import bookandauthorRouter from "./routes/bookandauthorRoutes.js"

app.use(express.json())
app.use(bodyParser.json())



app.use("/books",bookRouter)
app.use("/authors",authorRouter)
app.use("/bookandauthor",bookandauthorRouter)

app.get("/",(req,res)=>{

    res.send("server working ok")
})


sequelize.sync({alter:true}).then(()=>{

    app.listen(3000,()=>{

        console.log("Server Connected Successfull")
    })
})