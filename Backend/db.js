const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/teste1").catch((err)=>{
  console.log('erro: '+err)
})

//model

const Testeeschema = mongoose.Schema({

    url:{
        type: String,
        require: true
    },
    caminho:{
        type: String,
        require: true
    }
})

const testador = mongoose.model('testes1', Testeeschema)

module.exports = testador;
