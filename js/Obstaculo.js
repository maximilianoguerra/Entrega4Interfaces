class Obstaculo {
  constructor(paramId,paramStyle,paramDireccon) {
    this.id=paramId;
    this.posTop;
    this.direccon=paramDireccon;
    this.div='<div class="auto'+paramStyle+'"'+'id="auto'+paramId+'"'+'></div>';
    this.disponible=true;
  }
  animationEnd(){
    let that=this;
    let id=$('#auto'+this.id);
    id.on('webkitAnimationEnd',function (){
      id.remove();
      that.disponible=true;
    });
  }
}
