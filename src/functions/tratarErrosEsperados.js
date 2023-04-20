const string= require('string');
function tratarErrosEsperados(res,err) {

    // entrar quando o mongoose der algum erro
    if(String(err).includes('ValidationError:')) {
     return res.status(400).json({
        status: 'Erro',
        statusMensagem: string(String(err).replace('ValidationError:','').replaceAll(':','')),
        resposta: String(err)
     });
    }
    // pode ser um erro definido manualmente por mim
    if(String(err).includes('Error:')) {
        // console.log(err)
        return res.status(400).json({
            status: 'Error',
            statusMensagem: String(err).replace('Error',''),
            resposta: String(err)
        })
       
    }
    console.error(err);
    return res.status(500).json({
            status: 'Error',
            statusMensagem: 'Houve um problema inesperado volte mais tarde',
            resposta: String(err)
    })
}
module.exports=tratarErrosEsperados