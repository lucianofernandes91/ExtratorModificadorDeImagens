const WebSocket = require('ws');
const scrap = require('./scrap');

const fs  = require('fs');
const https = require('https')
const http = require('http')

const mongo = require('./db')


const porta = 3070;
const server = new WebSocket.Server({
  port: porta
});
console.log(`Aguardando na porta ${porta}`);

var sk;

server.on('connection', function(socket) {
  sk = socket;
  

  sk.on('message', (msg) => {
    let mensagem = msg.toString().split(',');
    let marcador = mensagem[1]  

    let url = mensagem[0]
 
    scrap(mensagem).then( (value, err) => {
      var arraySrcs = value;
      
      let saida = []
      let arquivo =''
      let arquivoStream  = ''
      
      if (!fs.existsSync('./uploads')){
        fs.mkdirSync('./uploads/');
        
      }
      let pasta = './uploads/'+Date.now()+'/'
      fs.mkdirSync(pasta);

      arraySrcs.forEach( (v,i,a) => {
        saida.push(v)
       
        let arquivo =pasta+Date.now()+'.png'
        let arquivoStream  = fs.createWriteStream(arquivo)

        try {
          let request = https.get(v,function (response){
            response.pipe(arquivoStream)
          })
          
        } catch (error) {
                    
          try {
            let request = http.get(v,function (response){
              response.pipe(arquivoStream)
            })  
          } catch (error) {
          
            
          }
        }
        
      });

      new mongo({
        url: url,
        caminho: pasta
      }).save().catch((err)=>{
        throw new Error(err);
      })

      sk.send(saida.toString())

    });
  });

  sk.on('close', () => { 

  });
});
