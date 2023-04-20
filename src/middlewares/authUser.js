const jwt=require('jsonwebtoken');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
async function authUser(req,res,next) {

    const token=req.header('x-auth-toke');

    if(!token) {
     return tratarErrosEsperados(res,new Error('token de autenticaçaõ nao fornecido'))
    }

    try{
       const decoded=jwt.verify(token,process.env.JWT_SECRET)
       req.usuarioJwt=decoded
       next()
    }catch(error) {
    console.log(error);
    return tratarErrosEsperados(res,new Error('token de autenticação invalido'))
    }
}
module.exports=authUser