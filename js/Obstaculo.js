class Obstaculo {
  constructor(paramId,paramStyle,paramDireccon,paramPlayer) {
    this.id=paramId;
    this.posTop;
    this.direccon=paramDireccon;
    this.div='<div class="auto'+paramStyle+'"'+'id="auto'+paramId+'"'+'></div>';
    this.disponible=true;
    this.interval;
    this.img;
    this.player1=paramPlayer;
    this.sumar=true;
  }
  animationEnd(){
    let that=this;
    let id=$('#auto'+this.id);
    id.on('webkitAnimationEnd',function (){
      clearInterval(that.interval);
      id.remove();
      that.sumar=true;
      that.disponible=true;
    });
  }
  animationStart(){
    let that=this;
    that.interval = setInterval(that.colisiones.bind(this), 150);
  }
  colisiones(){
    if(!this.player1.hayColision){

      let idAuto=$('#auto'+this.id);
      let player = $('#player');
      let playerWidth=parseInt(player.css('width'));
      let playerHeight=parseInt(player.css('height'));
      let enemyWidth=parseInt(idAuto.css('width'));
      let enemyHeight=parseInt(idAuto.css('height'));
      let posEnemy=idAuto.position();
      let posEnemyleft=parseInt(idAuto.css('left'));
      let posEnemyRight=parseInt(idAuto.css('left'))+enemyWidth;
      let posEnemyTop=posEnemy.top;
      let posEnemyBot=posEnemyTop+enemyHeight;
      let posPlayerleft=parseInt(player.css('left'));
      let posPlayerRight=parseInt(player.css('left'))+playerWidth;
      let posPlayerTop=parseInt(player.css('top'));;
      let posPlayerBot=parseInt(player.css('top'))+playerHeight;

      let conditionPosPlayerLeft=(posEnemyleft<posPlayerleft)&&(posEnemyRight>posPlayerleft);
      let conditionPosPlayerRight=(posEnemyleft<posPlayerRight)&&(posEnemyRight>posPlayerRight);
      let conditionPosPlayerTop=(posEnemyBot>posPlayerTop)&&(posEnemyTop<posPlayerTop);
      let conditionPosPlayerBot=(posEnemyBot>posPlayerBot)&&(posEnemyTop<posPlayerBot);

      if ((conditionPosPlayerLeft&&conditionPosPlayerTop)||
          (conditionPosPlayerRight&&conditionPosPlayerTop)||
          (conditionPosPlayerLeft&&conditionPosPlayerBot)||
          (conditionPosPlayerRight&&conditionPosPlayerBot))
      {
        if ((this.id==15||this.id==16)&&(this.sumar)) {
          clearInterval(this.interval);
          idAuto.remove();
          this.disponible=true;
          this.player1.life+=1;
          $('#life').text('X'+this.player1.life);
        }else {
            $(".ruta").css('animation-play-state' ,'paused');
            idAuto.css('animation-play-state' ,'paused');
            idAuto.remove();
            player.css('background','url(../Entrega4Interfaces/img/explosion11.png)')
            player.css('width',65);
            player.css('height',65);
            player.css('animation','explosion .8s steps(25) 2');
            clearInterval(this.interval);
            this.disponible=true;
            this.player1.hayColision=true;
            this.player1.life-=1;
            $('#life').text('X'+this.player1.life);
        }
      }else if ((!this.player1.hayColision)&&(posEnemyTop>posPlayerBot)&&(this.sumar)){
        this.sumar=false;;
        this.player1.score+=100
        $('#score').text(this.player1.score);
      }
    }
  }
  setImagen(){
    let random=parseInt(this.getRandomArbitrary(1,3));
    if (this.direccon=="contramano") {
      if(random==1){
        this.img='url(../Entrega4Interfaces/img/Car_2_01_opt2.png)';
      }else {
        this.img='url(../Entrega4Interfaces/img/Car_3_01_opt2.png)'
      }
    }else {
      if(random==1){
        this.img='url(../Entrega4Interfaces/img/Car_2_01_opt.png)';
      }else {
        this.img='url(../Entrega4Interfaces/img/Car_3_01_opt.png)'
      }
    }
  }
  setImgHpBonus(){
    this.img='url(../Entrega4Interfaces/img/spriteheart4.png)'
  }
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
}
