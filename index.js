const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const  cors = require("cors");
const swaggerUI=require("swagger-ui-express");
// const swaggerFile=require("./swagger/swagger_output.json");
// const swaggerOptions = {
//     customCssUrl: "/swagger-iu.css"
// }
const swaggeDocs=require("./swaggeDocs.json")

require("dotenv").config()


const usersRouter = require('./routes/users');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req,res)=>{/* #swagger.ignore=true*/ res.redirect("/doc")})
app.use("/doc",swaggerUI.serve,swaggerUI.setup(swaggeDocs))

app.use('/users', usersRouter);

if(process.env.NODE_ENV!=="test") {
    const PORT=process.env.PORT||4000;
    app.listen(PORT,()=>console.log(`servidor rodando da porta ${PORT}`))
}
module.exports = app;
