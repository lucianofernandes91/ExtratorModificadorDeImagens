//const WebSocket = require('ws');
const porta = 3070
const CliSckt = new WebSocket(`ws://localhost:${porta}`)  

CliSckt.onerror = ()=>{
  console.log('errou')
  document.querySelector('#capturar').disabled = true;

  let p = document.createElement('p')
  
  p.innerHTML = 
  'Nosso servidor esta indisponivel. Por favor recarregue a a página, caso não funcione, por favor entre em contato conosco';

  let apagar = document.querySelector('#divSaida').innerHTML =''
  
  document.querySelector('#divSaida').appendChild(p)
  

}

CliSckt.onopen = ( evento ) => {
  console.log("WebSocket conectado.")
}
CliSckt.onmessage = ( evento ) => {
  console.log('ola socket')

  document.querySelector('#capturar').disabled = false;

  let imagens = evento.data.toString().split(",")

  console.log('imagens')
  console.log(imagens)
  document.querySelector('#divSaida').innerHTML = ''
  
  var col=0;
  imagens.forEach(elemento => {
    const img = document.createElement('img')
    
    img.src = elemento
    img.style = "filter: grayscale(100%);"
    img.height = 50;
    img.width = 50;
    console.log(evento.data.toString())
    
    document.querySelector('#divSaida').appendChild(img)
    col++
    if (col >= 8) {
      const br = document.createElement('br')
      document.querySelector('#divSaida').appendChild(br)
      col = 0;
    }
  });

}

function capturaArmazenaEImprime() {
  document.querySelector('#divSaida').innerHTML = '<div class="spinner-border" role="status">'
  document.querySelector('#divSaida').innerHTML += '<span class="visually-hidden">Loading...</span>'
  document.querySelector('#divSaida').innerHTML += '</div>'


  const marcador = document.querySelector('#estaticaDinamica')

  console.log(marcador)

  //alert(marcador.checked)

  const URLaEnviar = document.getElementById('url').value +','+ marcador.checked
  CliSckt.send(URLaEnviar)
}
