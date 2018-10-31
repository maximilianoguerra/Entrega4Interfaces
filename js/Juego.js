let count=0;
let id="";
let obstaculos = new Array(30);
$(document).keydown(function(event) {
  switch (event.keyCode) {
    case 38 :{acelerar();break;}
    case 37 :{moverIzquierda();break;}
    case 40 :{alert("pulse abajo");break;}
    case 39 :{moverDerecha();break;}
    break;
    default:

  }
});
cargarObstaculos();
function cargarObstaculos(){
  for (var i = 0; i < obstaculos.length; i++) {
    if (i<15) {
      obstaculos[i]=new Obstaculo(i,2,"contramano");
    }else {
      obstaculos[i]=new Obstaculo(i,3,"mano");
    }

  }
}
setTimeout(crearObstaculos,3000);
function crearObstaculos(){
  // let index=parseInt(getRandomArbitrary(0,11));
  let topRandom;
    let obs = getObstaculo();
  if(obs.direccon=="contramano"){
  topRandom  = getRandomArbitrary(20,35.5);
}else {
  topRandom  = getRandomArbitrary(38.6,55);
}
  let topParam= topRandom+'%';
  if(obs.disponible){
    obs.disponible=false;
    obs.posTop=topParam;
    $('.ruta').append(obs.div);
    id=$('#auto'+obs.id);
    id.css('top',obs.posTop);
    obs.animationEnd();
  }
  setTimeout(crearObstaculos,1000);
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
  let posX = $('.auto').css('left');
  let x = $(".ruta").position();
  posX=parseInt(posX)-10;
  if (x.left+230<posX) {
    $('.auto').css('left',posX);
  }
}
function moverDerecha(){
  let posX = $('.auto').css('left');
  let x = $(".ruta").position();
  posX=parseInt(posX)+10;
  if (x.left+460>posX) {
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
    // case 39 :{alert("pulse izquierda");break;}
    // case 40 :{alert("pulse abajo");break;}
    // case 37 :{setTimeout(quitar,1000);alert("pulse Derecha");;break;}
    break;
    default:

  }
});
function quitar() {
  $('.auto').removeClass('moverDerecha');
}
$(document).ready(function(){
  $("button").click(function(){
    var x = $(".ruta").position();
    var y = $(".auto").position();
    alert("Top position: " + x.top + " Left position: " + x.left+" auto position: "+y.left);
  });
});
