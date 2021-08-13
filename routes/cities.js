//packages
const express = require('express');
const body_parser = require('body-parser');



//creat Router
const citiesRouter = express.Router();


//DataBase Connection
const connection = require("../dataBaseConnection.js")

//Body-Parser
citiesRouter.use(body_parser.urlencoded({ extended: false }));
citiesRouter.use(body_parser.json());


//Access-Control-Allow-Origin
citiesRouter.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("hi");
    next();
})



//GET ALL Cities
citiesRouter.get('/', (req, res) => {
    try {
        var sql = 'select * from cities';
        connection.query(sql, (err, result) => {
            if (err)
                throw err;
            res.send(JSON.stringify(result));
        })

    } catch (error) {
        console.log("error");
    }
})



module.exports = citiesRouter;