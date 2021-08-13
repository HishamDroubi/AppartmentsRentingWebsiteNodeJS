//packages
const express = require('express');
const body_parser = require('body-parser');
const bcrypt = require('bcrypt');
const date_format = require('dateformat');
const session = require('express-session');



const server = express();

//DataBase Connection
const connection = require('./dataBaseConnection');


//Routers
const appartments = require('./routes/appartments.js');
const cities = require('./routes/cities.js');
const subCities = require('./routes/subCities.js');
const users = require('./routes/users.js');


//medllewaress
server.use('/appartments', appartments);
server.use('/cities', cities);
server.use('/subCities', subCities);
server.use('/users', users);

server.use(session({ secret: 'secret' }));




server.use(body_parser.urlencoded({ extended: false }));
server.use(body_parser.json());

const port = 3002;
server.listen(port);

server.get('/', (req, res) => {



})

server.post('/login', async (req, res) => {
   try {
      let { customer_id, password } = req.body;

      // let password=req.params.password;
    
      let sql = 'select * from customer where customer_id=?';
      connection.query(sql, [customer_id], async (err, response) => {
         if (err)
            throw err;
         if (response.length == 0)
            console.log('no user');
         else {

            let login = await bcrypt.compareSync(password, response[0].password);

            if (login) {
               session.id = customer_id;
               res.redirect('users/whishlist/show');
              // res.send("log in succsesfully")
            }
            else
               res.send("invalid password")


         }
      })

   } catch (error) {

   }

})
server.post('/signUp', async (req, res) => {
   try {
      let { customer_id, name, phone, email, password } = req.body;

      let hashPassword = await bcrypt.hashSync(password, 10);

      let date = date_format(new Date(), "yyyy-mm-dd");


      let sql = 'insert into customer(customer_id,name,phone,email,password,register_date,status) values(?,?,?,?,?,?,1)'

      connection.query(sql, [customer_id, name, phone, email, hashPassword, date], (err, result) => {
         if (err)
            throw err;
         console.log('user added');
      })



   } catch (error) {
      console.log("hi");
   }
})




