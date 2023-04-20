const express = require('express');
const conectarBancoDados = require('../src/middlewares/conectarBD');
const tratarErrosEsperados = require('../src/functions/tratarErrosEsperados');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const EsquemaUsuario = require('../src/models/usuario');
const  router = express.Router();

/* GET users listing. */
router.post('/', conectarBancoDados, async function(req, res) {
  try {
    let {nome,email,senha}=req.body;
    const numeroVezesHash=10;
    const senhaHash=await bcrypt.hash(senha, numeroVezesHash);
    const respostaBD=await EsquemaUsuario.create({
      nome,email,senha: senhaHash
    })

    res.status(200).json({
      status: 'ok',
      statusMensagem: 'usuario criado com sucesso meu fi',
      resposta: respostaBD
    })
  }catch(erro) {
    if(String(erro).includes('email_1 dup key')){
      return tratarErrosEsperados(res,'Error: ja existe esse email')
    }
    return tratarErrosEsperados(res,erro)
  }
});
router.post('/logar', conectarBancoDados, async function(req, res) {
  try {
    let {email,senha}=req.body;
    //buscando pelo o email, passando qual campo queremos buscar
    // o ponto select tras o campo senha no finOne(consulta de obter)
    let respostaDB=await EsquemaUsuario.findOne({email}).select('+senha')
   if(respostaDB){
    //comparando a senha trasida pelo findOne
    //compare tras um true ou false
      let senhaCorreta=await bcrypt.compare(senha,respostaDB.senha);
       if(senhaCorreta) {
        
        //a configuração do sign salva as informacoes que eu quiser do usuario trasizes pelo respostaDB 
         let token=jwt.sign({id: respostaDB._id},process.env.JWT_SECRET,{expiresIn: '1d'});
         //nome do cabecalho e o valor dele
         res.header('x-auth-toke',token);
         res.status(200).json({
         status: 'ok',
         statusMensagem: 'usuario autenticado com sucesso meu cumpade',
         resposta: {'x-auth-toke': token}
         })}
      else {
         throw new Error('Email ou senha incorreta')
           }
   }else {
    throw new Error('Email ou senha incorreta')
   }
  }
   catch(erro) {
    return tratarErrosEsperados(res,erro)
               }
});


module.exports = router;
