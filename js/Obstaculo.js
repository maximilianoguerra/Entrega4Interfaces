class Obstaculo {
  constructor(paramId,paramStyle,paramDireccon) {
    this.id=paramId;
    this.posTop;
    this.direccon=paramDireccon;
    this.div='<div class="auto'+paramStyle+'"'+'id="auto'+paramId+'"'+'></div>';
    this.disponible=true;
    this.interval;
  }
  animationEnd(){
    let that=this;
    let id=$('#auto'+this.id);
    id.on('webkitAnimationEnd',function (){
      clearInterval(that.interval);
      id.remove();
      that.disponible=true;
    });
  }
  animationStart(){
    let that=this;
    let id=$('#auto'+this.id);
    id.on('webkitAnimationStart',function (){
      that.interval = setInterval(that.colisiones(id), 300);
    });
  }
  colisiones(id){
    let posEnemigo = id.position();
    let posPlayer = $('#player').position();
    console.log(posEnemigo.left+"entre");
    // console.log(posPlayer.left);
    if (((posEnemigo.top)>(posPlayer.left))&&(posEnemigo.top+30)<(posPlayer.left)) {
      console.log("hay colision");
    }
  }
}
