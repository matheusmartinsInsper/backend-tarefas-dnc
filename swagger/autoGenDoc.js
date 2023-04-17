/*
const mongooseToSwagger=require("mongoose-to-swagger");
const swaggerAutogen=require("swagger-autogen")({
    openapi: "2.23.1",
    language: "pt-BR"
})
const outputFile="./swagger_output.json"
const endpointsFiles=["../index.js"];

let doc = {
    info : {
        version : "1.0.0",
        title: "API de taskboard",
        description: "Documentacao do taskboard"
    },
    servers: [
       {
        url: "http://localhost:4000",
        description: "servidor localhost"
       },
       {
        url: "https://boardstak-backend-vercel.app",
        decription: "Servidor de produção"
       }
    ],
    consumes: ["application.json"],
    produces: ["application.json"]
}
swaggerAutogen(outputFile,endpointsFiles,doc).then(()=>{
    console.log("domentação od wagger gerada encontra-se no arquivo em"+outputFile);
    if(process.env.NODE_ENV!=="production"){
        require("../index.js")
    }
})*/