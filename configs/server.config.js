//there are 3 kinds of environment, development, production and user-acceptance-testing 
if (process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

//checking that the port value(8080 set here in .env file) matches with the requested port
module.exports = {
    PORT: process.env.PORT
}