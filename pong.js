// Alterações para fazer:
// 1. Verificar bug na contagem de pontos
// 2. Deixar tamanho da tela dinâmico
// 3. Fazer movimento da raquete computador ser mais "normal"
// 5. Alterar trilha sonora do fundo
// 6. Incluir botões para ativar e desativar sons (música e sons)
// 7. rever bug da bolinha travada atrás da raquete
// 8. Após ponto, bolinha inicia do meio, indo para lado que perdeu
// 9. Direção e velocidade da bola após tacada deve ir alterando

//variaveis da bolinha
let xBolinha = 295;
let yBolinha = 200;
let diametro = 10;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete = 15;
let yRaquete = 150;
let raqueteComprimento = 3;
let raqueteAltura = 90;
let colidiu = false;

//variaveis do oponente
let xRaqueteOponente = 582;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//variaveis placar
let myFont;
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound('trilha.mp3');
  ponto = loadSound('ponto.mp3');
  raquetada = loadSound('raquetada.mp3');
  myFont = loadFont('PressStart2P-Regular.ttf');
}

function setup() {
  createCanvas(600, 400);
  //trilha.loop();
  textFont(myFont);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  verificaColisaoRaquete();
  verificaColisaoRaqueteOponente();
  adicionaPlacar();
  contagemPontos();
  adicionaDivisao();
  bolinhaNaoFicaPresa();
  controlesDeSom();
}

function controlesDeSom() {
  textAlign(CENTER);
  textSize(10);
  fill(255);
  text('SOM?', 570, 20);
  if (mouseIsPressed) {
    if (mouseX > 550 && mouseX < 590 && mouseY > 10 && mouseY < 30) {
      if (trilha.isPlaying()){
        trilha.stop();
      }
      else{
        trilha.loop();
      }
    }
  }
}

function bolinhaNaoFicaPresa() {
  if (xBolinha - raio < 0) {
    xBolinha = 23;
  }
}

function adicionaDivisao() {
  stroke(255);
  let x1 = 0;
  let x2 = 8;
  for (x2; x2 <= height; x2 += 15) {
    line(300, x1, 300, x2);
    x1 += 15;
  }
}

function mostraBolinha() {
  square(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(87)) {
    yRaquete -= 15;
    if (yRaquete < 0) {
      yRaquete = 1;
    }
  }
  if (keyIsDown(83)) {
    yRaquete += 15;
    if (yRaquete > height - raqueteAltura) {
      yRaquete = height - raqueteAltura - 1;
    }
  }
}

function verificaColisaoRaquete() {
  if ((xBolinha - raio) < (xRaquete + raqueteComprimento) && ((yBolinha < yRaquete - raqueteAltura/2) || (yBolinha > yRaquete + raqueteAltura/2))) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaqueteOponente() {
  if ((xBolinha - raio) > (xRaqueteOponente) && ((yBolinha < yRaqueteOponente + raqueteAltura/2) || (yBolinha > yRaqueteOponente - raqueteAltura/2))) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

// function verificaColisaoRaquete(x, y) {
//   colidiu = collideRectCircle(
//     x,
//     y,
//     raqueteComprimento,
//     raqueteAltura,
//     xBolinha,
//     yBolinha,
//     raio
//   );
//   if (colidiu) {
//     velocidadeXBolinha *= -1;
//     raquetada.play();
//   }
// }




function movimentaRaqueteOponente() {
  velocidadeYOponente =
    yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  if (yRaqueteOponente > height - raqueteAltura) {
    yRaqueteOponente = height - raqueteAltura - 1;
  }
  calculaChanceDeErrar();
}

function adicionaPlacar() {
  textAlign(CENTER);
  textSize(25);
  fill(255);
  text(meusPontos, 150, 40);
  fill(255);
  text(pontosOponente, 450, 40);
}

function contagemPontos() {
  if (xBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
    zeraBolinha(-6);
  }
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
    zeraBolinha(6);
  }
}

function zeraBolinha(x){
  xBolinha = 295;
  yBolinha = 200;
  velocidadeXBolinha = 0;
  velocidadeYBolinha = 0;
  setTimeout(() => {
    velocidadeXBolinha = x;
    velocidadeYBolinha = 6;
  }, 800);
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35;
    }
  }
}
