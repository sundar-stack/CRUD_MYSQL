const express = require('express');
const app = express();
const mySql = require('mysql')
const cors = require("cors")

app.use(express.json());

///we have use cors to connect the api's for frontend //we will get cors error only for localhost development
app.use(cors())

const db = mySql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"employeesystem"
})

app.post('/create',async(req,res) => {

    //req means gathering information from frontend 
    //res means sending something frontend

    const { userName , country , wage , age , position } = await req.body 
    console.log(req.body);

    db.query("INSERT INTO employees (userName,country,wage,age,position) VALUES (?,?,?,?,?)",[userName,country,wage,age,position],(err, result) => {
        /// what we have to do from the db response 
        if(err){
            console.log(err);
            res.status(400).send("error")
        }else{
            res.status(200).json({message:"success"})
            console.log(result);
        }
    })

})

app.get('/getAllEmployees',(req, res)=>{
    db.query('SELECT * FROM employees',(err,docs)=>{
        if(err){
            console.log(err);
            res.status(400).send("error")
        }else{
            res.status(200).json(docs)
            console.log(docs);
        } 
    })
})

app.put('/update',(req, res)=>{
    const { id,wage } = req.body

    db.query("UPDATE employees SET wage = ? WHERE id = ?",[wage,id],(err, docs)=>{
        if(err){
            console.log(err);
            res.status(400).send(err)
        }else{
            res.status(200).json(docs)
            console.log(docs);
        } 
    })
})

app.get('/healthCheck',(req,res)=>{
    res.send('sucessfully running')
})

app.listen(5049,()=>{
    console.log("server started");
})