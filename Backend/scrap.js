const { writeFile } = require('fs');
const puppeteer = require('puppeteer');

module.exports = async function scrap(mensagem){

  const marcador = mensagem[1]

  const url = mensagem[0]
  
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();

  console.log('ja carregou a pagina?')

  await page.goto(`${url}`).catch((error)=>{
    console.log(`pagina nao encontrada ${url}`)
    return ['erro']
  })

  const waitTillHTMLRendered = async (page, timeout = 30000) => {
    const checkDurationMsecs = 500;
    const maxChecks = (timeout / (checkDurationMsecs*2)) ;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;
  
    while(checkCounts++ <= maxChecks){
      let html = await page.content();
      let currentHTMLSize = html.length; 
  
      let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);
  
      console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);
  
      if(lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) 
        countStableSizeIterations++;
      else 
        countStableSizeIterations = 0; //reset the counter
  
      if(countStableSizeIterations >= minStableSizeIterations) {
        console.log("Page rendered fully..");
        break;
      }
  
      lastHTMLSize = currentHTMLSize;
      await page.waitForTimeout(checkDurationMsecs);
    }  
  };

  console.log('devo execcutar o waiwaitTillHTMLRendered?')
  console.log(marcador)
  if(marcador=='false'){
    await waitTillHTMLRendered(page);
  }

  console.log('Carregou!')

  const arraySrcImg= await page.evaluate(async ()=> {
    let saida =[]
    
    document.querySelectorAll('img').forEach( (v) => {
      if (v.src != '') {
        saida.push(v.src);
      }
    });

    return saida
  })

  await browser.close(); 
  return arraySrcImg
}


