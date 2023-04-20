const mongoose=require('mongoose');
const tratarErrosEsperados=require('../functions/tratarErrosEsperados')

async function conectarBancoDAdos(req=null, res=null, next=null) {
    try{
       await mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
       console.log('conectado ao banco de dados!')
       try{next()}catch{}
       return mongoose
    }
    catch(error){
      console.log(error);
      tratarErrosEsperados(res, 'Error: Erro ao conectar ao banco de dados')
      return error
    }
}
module.exports=conectarBancoDAdos;