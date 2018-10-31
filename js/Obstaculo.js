class Obstaculo {
  constructor(paramId,paramStyle) {
    this.id=paramId;
    this.posTop;
    this.div='<div class="auto'+paramStyle+'"'+'id="auto'+paramId+'"'+'></div>';
    this.disponible=true;
  }
  animationEnd(){
    let obs=this;
    let id=$('#auto'+this.id);
    id.on('webkitAnimationEnd',function (){
      id.remove();
      obs.disponible=true;
    });
  }
}
