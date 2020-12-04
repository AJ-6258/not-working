class Game {
    constructor(){

    }   
  getstate(){
      var gamestateref= database.ref('gameState');
      gamestateref.on("value",function(data){
          gameState = data.val();
      })
  }
  update(state){
      database.ref('/').update({
          gameState : state
      })
  }
  async start(){
      if(gameState===0){
          player = new Player();
          var playerCountref = await database.ref('playerCount').once("value");
          if (playerCountref.exists()){
              playerCount=playerCountref.val();
              player.getCount();
          }
          form = new Form ();
          form.display();
      }
      car1 = createSprite(100,200);
      car1.addImage(car1img);
      car2 = createSprite(300,200);
      car2.addImage(car2img);
      car3 = createSprite(500,200);
      car3.addImage(car3img);
      car4 = createSprite(700,200);
      car4.addImage(car4img);

      cars = [car1,car2,car3,car4];
  }
  play(){
    form.hide();
    text("Game Start",120,100);
    Player.getPlayerinfo();
    player.getcarsatend();

    if(allPlayers!==undefined){
        //var displayposition = 130;
        background('brown');
        image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5);
        var index = 0;
        var x = 200;
        var y;
        var move;
        for(var plr in allPlayers){
            index=index+1;
            x=x+200;
            y=displayHeight-allPlayers[plr].distance;
            move=allPlayers[plr].move;
            cars[index-1].x=x+move;
            cars[index-1].y=y;
            if(index===player.index){
                stroke(10);
                fill ('red');
                ellipse(x,y,60,60);
                cars[index-1].shapeColor='red';
                camera.position.x = displayWidth/2;
                camera.position.y = cars[index-1].y;

            }
        }
    }

    if (keyIsDown(UP_ARROW) && player.index!==null){
      player.distance+=10;
      player.update();
    }
    if (keyIsDown(LEFT_ARROW) && player.index!==null){
        player.move-=5;
        player.update();
    }
    if (keyIsDown(RIGHT_ARROW) && player.index!==null){
        player.move+=5;
        player.update();
    }

    if (player.distance>3700){
        gameState=2;
        player.rank+=1;
        Player.updatecarsatend(player.rank);
    }
    drawSprites();
  }
  end (){
      console.log("Game Over");
      console.log(player.rank);
    }
  } 