const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost/teste1")
    .then(()=>{
        console.log('foi')
    }).catch((err)=>{
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


//colletcion
//module.exports = mongoose.model('testes')

const testador = mongoose.model('testes1', Testeeschema)


// new testador({
//     testeLink:"https://google.com",
//     testeCaminho:"caminho"
// }).save()
//     .then(()=>{
//         console.log('salvou')
//     }).catch((err)=>{
//         console.log('ouve um erro')
//     })

module.exports = testador;

// const Urleschema = mongoose.Schema({

//     linkDaPagina:{
//         type: String,
//         require: true
//     },
//     caminhoDaImagem:{
//         type: String,
//         require: true
//     }
// })


// //colletcion
// mongoose.model('Urls',Urleschema)