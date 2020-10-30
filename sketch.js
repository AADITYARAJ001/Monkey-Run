var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,bground,bgroundImage,invisibleGround;
var FoodGroup, obstacleGroup
var score = 0;
var survivalTime;

function preload(){
  
    //Loading images
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
   bgroundImage=loadImage("j.png");
}



function setup()
{
      //Creating canvas. 
    createCanvas(600,600);
  
      //Creating background.  
    bground = createSprite(200,200,20,20);  
    bground.addImage("image",bgroundImage);
    bground.velocityX=-5; 
      bground.scale = 1;

    //Creating player as monkey.  
    monkey = createSprite(80,450,20,20);  
    monkey.addAnimation("running",monkey_running);
    monkey.scale = 0.1;

    //Creating invisible ground.  
    invisibleGround = createSprite(400,480,900,10);

    //Creating groups.  
    obstaclesGroup = new Group ();  
    bananasGroup = new Group ();   
}


function draw() 
{
    //Adding game states.  
    if(gameState===PLAY)
      {
        if(bground.x<0)
      {
        bground.x=bground.width/2;
      }
      monkey.collide(invisibleGround);


         if(keyDown("space")&& monkey.y>100)
        {
          monkey.velocityY=-12;
        }
      monkey.velocityY=monkey.velocityY+0.8;

      createObstacles ();
      createBanana ();

        drawSprites(); 

      }
      if(monkey.isTouching(obstaclesGroup))
      {
        gameState = END;
      }
       else if (gameState === END)
         {
         stroke("red");
           textSize(35);
          text("GAME OVER",200,200); 
          bground.velocityX = 0;
          bananasGroup.destroyEach();
          obstaclesGroup.destroyEach();


         }

    //Making invisible ground as invisible.  
      invisibleGround.visible = false;

    //Adding text for displaying scores.  
      stroke("red");
      textSize(25);
    text("EATS:"+score,500,50);  

    stroke("red");
    textSize(25);  

  //Adding survival time
    survivalTime =  Math.ceil(frameCount/frameRate())
    text("Survival Time:"+survivalTime,100,50);
}

// Creating function for obstacles.
function createObstacles ()
{
    if(frameCount % 300 === 0)
      {
  obstacle = createSprite((                                         Math.round(random(10,560))),460,20,20);
  obstacle.velocityX= -5; 
  obstacle.addImage("obstacleImg",obstacleImage);   
  obstacle.scale = 0.1;
  obstaclesGroup.add(obstacle);      
      }
  

  
}
 
//Creating function for banana. 
function createBanana ()
{
         if(frameCount % 80 === 0)
      {
        banana =                                                           createSprite(200,Math.round(random(20,370)),10,10);
        banana.addImage("banana",bananaImage);
        banana.scale = 0.1;
        banana.velocityX = -5;
        bananasGroup.add(banana);
      }

        if(bananasGroup.isTouching(monkey))
      {
        bananasGroup.destroyEach();
        score = score+1;
      }
}


