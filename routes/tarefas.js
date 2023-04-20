const express = require('express');
const conectarBancoDados = require('../src/middlewares/conectarBD');
const tratarErrosEsperados = require('../src/functions/tratarErrosEsperados');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const EsquemaTarefa = require('../src/models/tarefas');
const authUser = require('../src/middlewares/authUser');
const  router = express.Router();

/* GET users listing. */
router.post('/criar', authUser , conectarBancoDados, async function(req, res) {
  try {
    let {posicao,titulo,descricao,status,dataEntrega}=req.body;
    const usuarioCriador=req.usuarioJwt.id
    const respostaBD=await EsquemaTarefa.create({
        posicao,titulo,descricao,status,dataEntrega,usuarioCriador
    })

    res.status(200).json({
      status: 'ok',
      statusMensagem: 'tarefa criado com sucesso meu fi',
      resposta: respostaBD
    })
  }catch(erro) {
    return tratarErrosEsperados(res,erro)
  }
})

router.put('/editar/:id', authUser , conectarBancoDados, async function(req, res) {
  try {
    let idTarefa=req.params.id
    let {posicao,titulo,descricao,status,dataEntrega}=req.body;
    const usuarioLogado=req.usuarioJwt.id
    const checkTarefa= await EsquemaTarefa.findOne({_id: idTarefa, usuarioCriador: usuarioLogado})
    if(!checkTarefa) {
      throw new Error('tarefa nao encontrada ou pertencente ao usuario')
    }
    const tarefaAtualizada=await EsquemaTarefa.updateOne({_id: idTarefa},{
        posicao,titulo,descricao,status,dataEntrega
    })
    if(tarefaAtualizada?.modifiedCount>0) {
      const taskAtualizada= await EsquemaTarefa.findOne({_id: idTarefa})
      res.status(200).json({
        status: 'ok',
        statusMensagem: 'tarefa atualizada com sucesso meu fi',
        resposta: taskAtualizada
      })
    }

    
  }catch(erro) {
    return tratarErrosEsperados(res,erro)
  }
});
router.get('/consultar', authUser , conectarBancoDados, async function(req, res) {
  try {
    
    const usuarioLogado=req.usuarioJwt.id
    const respostaBD=await EsquemaTarefa.find({usuarioCriador: usuarioLogado})

    res.status(200).json({
      status: 'ok',
      statusMensagem: 'tarefa encontrada com sucesso meu parceiro',
      resposta: respostaBD
    })
  }catch(erro) {
    return tratarErrosEsperados(res,erro)
  }
});
router.delete('/deletar/:id', authUser , conectarBancoDados, async function(req, res) {
  try {
    let idTarefa=req.params.id
    const usuarioLogado=req.usuarioJwt.id
    const checkTarefa= await EsquemaTarefa.findOne({_id: idTarefa, usuarioCriador: usuarioLogado})
    if(!checkTarefa) {
      throw new Error('tarefa nao encontrada ou pertencente ao usuario')
    }
    const tarefaExcluida=await EsquemaTarefa.deleteOne({_id: idTarefa})
    const respostaBD=await EsquemaTarefa.find({usuarioCriador: usuarioLogado})
      
      res.status(200).json({
        status: 'ok',
        statusMensagem: 'tarefa excluida com sucesso meu fi',
        resposta: respostaBD
      })
  }catch(erro) {
    return tratarErrosEsperados(res,erro)
  }
});
module.exports = router;