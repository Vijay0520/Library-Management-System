const express=require('express')
// const {users}=require('./data/users.json')
const dotenv = require("dotenv")

//import database connection file
const DbConnection=require('./databaseConnection')

//importing the routers
const usersRouter=require('./routes/users');
const booksRouter=require('./routes/books');

dotenv.config();

const app=express()

 DbConnection();

const PORT=8081

app.use(express.json())


app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Home Page"
    })
})

app.use('/users',usersRouter);
app.use('/books',booksRouter);


app.listen(PORT,()=>{
    console.log(`server is up and running in http://localhost:${8081}`);
    
})