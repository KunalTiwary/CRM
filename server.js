const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Ticket = require('./models/ticket.model');
const express = require('express');
const { init } = require('./models/user.model');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const ticketRoutes = require('./routes/ticket.routes');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;
db.on("error", ()=> {
    console.log("error while connecting to db");
});
db.once("open", ()=>{
    console.log("connected to MongoDB");
})
app.use(userRoutes);
app.use(authRoutes);
app.use(ticketRoutes);

app.listen(serverConfig.PORT, ()=>{
    console.log(`Application started on port num: ${serverConfig.PORT}`)
});
