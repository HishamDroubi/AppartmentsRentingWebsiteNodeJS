//packages
const express = require('express');
const body_parser=require('body-parser');


//creat Router
const appartmentsRouter = express.Router();



//DataBase Connection
const connection = require('../dataBaseConnection.js');



//Body-Parser
appartmentsRouter.use(body_parser.urlencoded({ extended: false }));
appartmentsRouter.use(body_parser.json());



//Access-Control-Allow-Origin
appartmentsRouter.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
})


//GET ALL Appartments
appartmentsRouter.get('/', (req, res) => {
    try {
            let sql = 'select * from appartments';
            connection.query(sql, (err, result) => {
                if(err)
                throw err;
               res.send(JSON.stringify(result));
            })     
    } catch (error) {
  console.log("hi");
    }
})


//GET A Specific Appartment
appartmentsRouter.get('/:appartment_id',(req,res)=>{
  try {
    let appartment_id=req.params.appartment_id;
  const sql="select * from appartments where appartment_id=?";

  connection.query(sql,[appartment_id],(err,result)=>{
    if(err)
    throw err;
    res.send(JSON.stringify(result));
  });
  } catch (error) {
    
  } 
})


//GET All Appartments in a Specific City
appartmentsRouter.get("/city/:city_id",(req,res)=>{
  try {
    let city_id=req.params.city_id;
    const sql='select * from appartments join sub_cities using (sub_city_id) where city_id=?'
    connection.query(sql,[city_id],(err,result)=>{
      if(err)
      throw err;
      res.send(JSON.stringify(result));
    })
  } catch (error) {
    
  }
})


//GET All Appartments in a Specific Sub_City
appartmentsRouter.get("/sub_city/:sub_city_id",(req,res)=>{
  try {
    let sub_city_id=req.params.sub_city_id;
    const sql='select * from appartments where sub_city_id=?'
    connection.query(sql,[sub_city_id],(err,result)=>{
      if(err)
      throw err;
      res.send(JSON.stringify(result));
    })
  } catch (error) {
    
  }
})






//Export The Router
module.exports = appartmentsRouter;

