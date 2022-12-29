const app = require("./app");

//
process.on("uncaughtException" , (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception error");
})
//config
const dotenv = require("dotenv");
dotenv.config({path:"backend/config/config.env"});

//database
const db = require('./config/db');
db();
//server
const port = process.env.PORT;
const server =  app.listen(port, ()=> console.log(`listening on port number ${port}`));

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error was ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    })
})