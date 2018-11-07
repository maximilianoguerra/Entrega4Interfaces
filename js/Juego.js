let count=0;
let id="";
let obstaculos = new Array(30);
let posXleft = 48.5;
let intervalGame;
let player1= new Player();
let commandActive=true;
let divLose='<div class="loser"></div>';
let jugarVar=true;
$('#showControl').hide();
$('#showRank').hide();
$(document).keydown(function(event) {
  if (commandActive) {
    switch (event.keyCode) {
      case 37 :{moverIzquierda();break;}
      case 39 :{moverDerecha();break;}
      break;
      default:
    }
  }

});
$(document).on('click','.controles',function () {
  $('#showControl').toggle();
})
$(document).on('click','.ranking',function () {
  $('#showRank').toggle();
})
$(document).on('click','#jugar',function () {
  $('#jugar').attr('disabled','true');
  if (jugarVar) {
    jugarVar=false;
    cargarObstaculos();
    jugar();
  }

})
$(document).on('click','#playAgain',function () {
  if (jugarVar) {
    jugarVar=false;
    $('.loser').remove();
    player1.life=3;
    player1.score=0;
    $('#score').text(player1.score);
    $('#life').text('X'+player1.life);
    cargarObstaculos();
    setTimeout(jugar,4000);
  }
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
  cargarAutoPlayer();
  $(".ruta").css('animation','play 4s linear infinite');
  intervalGame=setInterval(crearObstaculos,1000);
}
function hayColsion() {
    if(player1.hayColision){
      commandActive=false;
      clearInterval(intervalGame);
        if (player1.life==0) {
          $('.ruta').append(divLose);
          if (player1.score>player1.hiScore) {
            player1.hiScore=player1.score;
            $('#hiScore').text(player1.hiScore);
          }
          jugarVar=true;
        }else {
          setTimeout(jugar,6000)
        }

    }
}
function crearObstaculos(){
  let topRandom;
  let img;
  let obs = getObstaculo();
  if(obs.direccon=="contramano"){
    topRandom  = getRandomArbitrary(35,46);
  }else {
    topRandom  = getRandomArbitrary(50,60);
  }
  let topParam= topRandom+'%';
  if(obs.disponible){
    obs.disponible=false;
    obs.posTop=topParam;

    $('.ruta').append(obs.div);
    id=$('#auto'+obs.id);
    if (obs.id==15||obs.id==16) {
      id.css('width',67);
      id.css('height',60);
      id.css('animation' ,'example 4s linear,heart2 0.5s steps(6) infinite');
    }
    id.css('background',obs.img);
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
  if (60>posXleft) {
    posXleft=posXleft+3;
    let posX =posXleft;
    posX=posX+"%";
    $('.auto').css('left',posX);
  }
}

function cargarAutoPlayer(){
  $('.ruta').append(player1.div);
  $('#player').css('width',30);
  $('#player').css('height',60);
  $('#player').css('background','url(../Entrega4Interfaces/img/Car_opt2.png)');
  $('#player').css('animation','carRespawn 1s 2');
}
