let count=0;
let id="";
let obstaculos = new Array(30);
let posXleft = 54.5;
let intervalGame;
let player1= new Player();
let commandActive=true;
$(document).keydown(function(event) {
  if (commandActive) {
    switch (event.keyCode) {
      case 38 :{acelerar();break;}
      case 37 :{moverIzquierda();break;}
      case 40 :{alert("pulse abajo");break;}
      case 39 :{moverDerecha();break;}
      break;
      default:
    }
  }

});
$(document).on('click','#jugar',function () {
  cargarObstaculos();
  jugar();
})

function cargarObstaculos(){
  for (var i = 0; i < obstaculos.length; i++) {
    if (i<15) {
      obstaculos[i]=new Obstaculo(i,3,"contramano",player1);
      obstaculos[i].setImagen();
    }else if (i==15) {
      obstaculos[i]=new Obstaculo(i,3,"contramano",player1);
      obstaculos[i].setImgHpBonus();
    }else if (i==16) {
      obstaculos[i]=new Obstaculo(i,2,"mano",player1);
      obstaculos[i].setImgHpBonus();
    }else {
      obstaculos[i]=new Obstaculo(i,2,"mano",player1);
      obstaculos[i].setImagen();
    }

  }
}
function jugar(){
  player1.hayColision=false;
  commandActive=true;
  if (player1.life==0) {
    clearInterval(intervalGame);
    alert("perdiste")
  }else {
    cargarAutoPlayer();
    $(".ruta").css('animation','play 4s linear infinite');
    intervalGame=setInterval(crearObstaculos,1000);
  }

}
function hayColsion() {
    if(player1.hayColision){
      commandActive=false;
      clearInterval(intervalGame);
      setTimeout(jugar,6000)
    }
}
function crearObstaculos(){
  let topRandom;
  let img;
  let obs = getObstaculo();
  if(obs.direccon=="contramano"){
    topRandom  = getRandomArbitrary(35,52);
  }else {
    topRandom  = getRandomArbitrary(57.1,73);
  }
  let topParam= topRandom+'%';
  if(obs.disponible){
    obs.disponible=false;
    obs.posTop=topParam;

    $('.ruta').append(obs.div);
    id=$('#auto'+obs.id);
    if (obs.id==15||obs.id==16) {
      id.css('width',32);
      id.css('height',32);
    }
    id.css('background',obs.img)
    id.css('left',obs.posTop);
    obs.animationStart();
    obs.animationEnd();
  }
  hayColsion();
}
function getObstaculo(){
  let i =parseInt(getRandomArbitrary(0,30));
  if(obstaculos[i].disponible){
    return obstaculos[i];
  }else {
    return getObstaculo();
  }

}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function moverIzquierda(){
  if (37<posXleft) {
    posXleft=posXleft-3;
    let posX =posXleft;
    posX=posX+"%";

    $('.auto').css('left',posX);
  }
}
function moverDerecha(){
  if (70>posXleft) {
    posXleft=posXleft+3;
    let posX =posXleft;
    posX=posX+"%";
    $('.auto').css('left',posX);
  }
}
function acelerar() {
  $(".ruta").css('animation' ,'play 2s linear infinite');
  $(".auto2").css('animation-play-state' ,'paused');
  $(".auto3").css('animation-play-state' ,'paused');
  $(".auto2").css('animation-duration' ,'3s');
  $(".auto3").css('animation-duration' ,'3s');
  console.log($(".auto3").css('animation-duration'));
  $(".auto2").css('animation-play-state' ,'running');
  $(".auto3").css('animation-play-state' ,'running');
  console.log($(".auto3").css('animation-duration'));
}
function desalerar() {
  $(".ruta").css('animation' ,'play 4s linear infinite');
  $(".auto2").css('animation-play-state' ,'paused');
  $(".auto3").css('animation-play-state' ,'paused');
  $(".auto2").css('animation-duration' ,'6s');
  $(".auto3").css('animation-duration' ,'6s');
  $(".auto2").css('animation-play-state' ,'running');
  $(".auto3").css('animation-play-state' ,'running');
  console.log($(".auto3").css('animation-duration'));
}
$(document).keyup(function(event) {
  switch (event.keyCode) {
    case 38 :{desalerar();break;}
    break;
    default:

  }
});

function cargarAutoPlayer(){
  $('.ruta').append(player1.div);
  $('#player').css('width',30);
  $('#player').css('height',60);
  $('#player').css('background','url(../Entrega4Interfaces/img/car_opt2.png)');
  $('#player').css('animation','carRespawn 1s 2');
}
