const app = require("./index")
const {sequelize,connectToDatabase} = require("./utils/mysql");
const port = process.env.PORT;
const Db = require("./utils/mongo");
const dotenv = require("dotenv").config({path: "./.env"});

connectToDatabase();
Db();

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err); 
    process.exit(1);  
  });

app.listen(port, console.log(`server conected on localhost : ${port} `));