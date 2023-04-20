const mongoose=require('mongoose');
const validator =require('validator');

const esquema=new mongoose.Schema(
    //objeto do schema usuario
    {
        nome: {
            type: String,
            required: 'o nome é obrigatorio'
        },
        email: {
            type: String,
            unique: true,
            required: 'o email é obrigatorio',
            lowercase: true,
            index: true,
            validate: {
                validator: (valorDigitado)=>{return validator.isEmail(valorDigitado)},
                message:'invalido'
            }
        },
        senha: {
            type: String,
            required: 'a senha é obrigatroia',
            select: false
        }
    },
    //configurações do schema, essa configurações cria de forma automatica a data de criação e atualização do usuario
    {
        timestamps: true
    }
);
const EsquemaUsuario=mongoose.models.Usuario||mongoose.model('Usuario',esquema);
module.exports=EsquemaUsuario
