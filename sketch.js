var PLAY = 1
var END = 0
var gameState = PLAY
var ground
var player, playerPlane, playerPlaneImg, playerImg, playerDead
var bg, bgImg
var change1, change2
var ObstaclesGroup
var MonsterGroup, monsterImg, monsterImg2
var bulletGroup, bullet, bulletImg
var restart, restartImg
var th, thI
var bb1, bb2, bb3, bb4, bb5
var gameOver, overImg
var cancel, bulletButton

var planeFrame = 0
var buttonFrame = 0
var bulletCount = 3
var bulletFrame = 0
var score = 0
var ff = 0

var s1, s2, s3, s4, s5, s6, s7, s8


function preload() {

  bgImg = loadImage('Images/background.jpg')  
  playerPlaneImg = loadImage('Images/plane.png')
  bulletImg = loadImage('Images/bullet2.png')
  playerImg = loadAnimation('cc/1.png', 'cc/2.png', 'cc/3.png',  'cc/4.png', 'cc/5.png', 'cc/6.png', 'cc/7.png', 'cc/8.png', 'cc/9.png', 'cc/10.png', 'cc/11.png', )
  bb1 = loadImage('Images/bb.png')
  bb2 = loadImage('Images/melee2.png')
  bb3 =  loadImage('Images/melee3.png')
  bb4 =  loadImage('Images/melee4.png')
  bb5 = loadImage('Images/melee5.png')
  monsterImg = loadAnimation('mm/MM1.png', 'mm/MM2.png', 'mm/MM3.png', 'mm/MM4.png', 'mm/MM5.png', 'mm/MM7.png')
  monsterImg2 = loadAnimation('mm/mm31.png','mm/mm32.png', 'mm/mm33.png', 'mm/mm34.png', 'mm/mm35.png', 'mm/mm36.png', 'mm/mm37.png')
  restartImg = loadImage('Images/restart.png')
  playerDead = loadImage('cc/deadd.png')
  overImg = loadAnimation("gameOver/1.png", "gameOver/2.png", "gameOver/3.png", "gameOver/4.png", "gameOver/5.png", "gameOver/6.png", "gameOver/7.png", "gameOver/8.png",
              "gameOver/9.png", "gameOver/10.png", "gameOver/11.png", "gameOver/12.png", "gameOver/13.png", "gameOver/14.png", "gameOver/15.png", "gameOver/16.png", "gameOver/17.png",
               "gameOver/18.png", "gameOver/19.png", "gameOver/20.png", "gameOver/21.png", "gameOver/22.png", "gameOver/23.png", "gameOver/24.png", "gameOver/25.png", "gameOver/26.png",
                "gameOver/27.png", "gameOver/28.png", "gameOver/29.png", "gameOver/30.png", "gameOver/31.png", "gameOver/32.png", "gameOver/33.png", "gameOver/34.png", "gameOver/35.png",
                 "gameOver/36.png", "gameOver/37.png", "gameOver/38.png", "gameOver/39.png", "gameOver/40.png", "gameOver/41.png", "gameOver/42.png", "gameOver/43.png", "gameOver/44.png",
                  "gameOver/45.png", )
  thI = loadImage("Images/this.png")
  s1 = loadSound("song/jump.mp3")
  s2 = loadSound("song/hit.mp3")
  s3 = loadSound("song/over.mp3")
  s4 = loadSound("song/Fireball.mp3")
  s5 = loadSound("song/transfer.mp3")
  s6 = loadSound("song/again.mp3")
  s7 = loadSound("song/restart.mp3")
  s8 = loadSound("song/recharge come.mp3")
}

function setup() {
  createCanvas(1000, 600);

  bg = createSprite(1000, 300, 0, 0)
  bg.addImage('b1', bgImg)
  bg.x = bg.width/2
 
 ground = createSprite(675, 510, 1350, 20);
 ground.visible = false

 player = createSprite(110, 470, 20, 80)
 player.addAnimation('pl2', playerImg)
 player.addImage('de1', playerDead)
 player.scale = 0.6
 player.setCollider('rectangle', 20, 0, 170, 120)

 bulletGroup = new Group
 ObstaclesGroup = new Group
 MonsterGroup = new Group

 change1 = createButton('Plane')
 change1.position(900, 550)
  
 th = createSprite(500, 400)
 th.addImage("t1", thI)
 th.scale = 0.5
 th.visible = false

 restart = createSprite(500, 500, 30, 30)
  restart.addImage('r1', restartImg) 
  restart.scale = 0.5
  restart.visible = false

  gameOver = createSprite(500, 200)
  gameOver.addAnimation('gg1', overImg)
  gameOver.scale = 0.6
  gameOver.visible = false

  bulletButton = createButton('Bullet')
  bulletButton.position(340, 551)

  cancel = createButton('Cancel')
  cancel.position(900, 550)

}

function draw() {
    
    background(0) 

    drawSprites();  
    
 

  if(gameState !== END){

    if(frameCount%25 === 0){
      score = score+1
    }

    bulletButton.hide()
  
    fill('orange')
    textSize(20)
    text("HI My Friend", 100, 25)
  
    fill('gold')
    textSize(20)
    text("Your Score My Friend : " + score, 750, 25)

    fill('lightblue')
    textSize(20)
    text("Remaining Bullets: "+ bulletCount, 400, 25)
    
      bg.velocityX = -(13 + 2.5*score/30)
  
    if(bg.x<360){
      bg.x = bg.width/2
    }
  
   change1.mousePressed(()=>{
     playerPlane = createSprite(100, 100)
     playerPlane.addImage('pl1', playerPlaneImg)
     playerPlane.scale = 0.16
     planeFrame = frameCount
     change1.hide()
     player.visible = false
     s5.play()
     ff = 1
    })

    if(planeFrame+250 === frameCount && playerPlane){
      playerPlane.remove()
      player.visible = true
      s6.play()
      ff = 2
    }else if(cancel.mousePressed(()=>{
       playerPlane.remove()
      player.visible = true
      s6.play()
      ff = 2
    }))

   
    
    if(planeFrame + 600 === frameCount && change1){
      change1.show()
      planeFrame = 0
      ff = 0
    }

    spawnObstacles()
    spawnMonster()

    if(planeFrame === 0){
      
      fill('green')
      textSize(20)
      text("Click to become Plane :-", 675, 568 )  

    }

    if(ff === 1 && player.visible === false){
      cancel.show()

      fill('green')
      textSize(20)
      text("Click to cancel plane :-", 675, 568)
    }

    if(ff === 2){
      fill('green')
      textSize(20)
      text("Wait for sometime to recharge plane", 575, 568)
    }

    if(player.visible === true){

      fill('red')
    textSize(20)
    text('"Click SPACE BUTTON to Jump to avoid obstacles"', 250, 75)

      if(bulletCount>=1 && bulletCount<=3){
        bulletButton.show()
        fill('lightgreen')
        textSize(20)
        text("Click for bullets to kill Monster :-", 50, 567.5)
      }else 
      if(bulletCount === 0){
        fill('lightgreen')
        textSize(20)
        text("Wait for some time to get bullets", 100, 567.5)
      }

      bulletKill()
      cancel.hide()

    if(keyDown('space') && player.y > 449){
      player.velocityY = -15
      s1.play()
    }
   
      player.velocityY = player.velocityY+0.8

      if(MonsterGroup.isTouching(bulletGroup)){
        MonsterGroup.destroyEach()
        bullet.destroy()
        score = score+5
        s2.play()
      }

     

 if(MonsterGroup.isTouching(player) || ObstaclesGroup.isTouching(player)){
  gameState = END

  s3.play()
  
  }

  }
  }

  if(gameState === END){

    fill('red')
    textStyle('italic')
    textSize(30)
    text('Click RESTART to restart the Game', 250, 300)

    gameOver.visible = true
    th.visible = true
    restart.visible = true

    player.changeAnimation('de1', playerDead)
    player.scale = 0.6

    MonsterGroup.destroyEach()
    ObstaclesGroup.setVelocityXEach(0)
    bg.velocityX = 0
    player.velocityY = 0

    MonsterGroup.setLifetimeEach(-1)
    ObstaclesGroup.setLifetimeEach(-1)

    bulletButton.hide()
    change1.hide()

    bulletGroup.setLifetimeEach(-1)   
    bulletGroup.destroyEach()
    
    if(mousePressedOver(restart)&& restart.visible === true){
      reset()
    }

  }

  player.collide(ground)

}

function spawnObstacles(){

  if(frameCount%110 === 0){
    var obstacle = createSprite(1000, 460, 50, 50)
    obstacle.velocityX = -(14 + 2.5*score/30)
    var rand = Math.round(random(1,5))
    switch(rand){
    case 1:
     obstacle.addImage('b1', bb2)
    obstacle.scale = 0.9
    obstacle.setCollider('rectangle', 0, 0, 140, 50)
    break;
    case 2:
    obstacle.addImage('b1', bb3)
    obstacle.scale = 0.5
    obstacle.setCollider('rectangle', -10, 0, 250, 150)
    break;
    case 3:
    obstacle.addImage('b1', bb1)
    obstacle.scale = 0.17
    break;
    case 4:
     obstacle.addImage('b4', bb4)
     obstacle.scale = 0.4
    break;
    case 5:
    obstacle.addImage('b5', bb5)
    obstacle.scale = 0.5
    obstacle.setCollider('rectangle', 0, 0, 260, 80)
    break;
    }
    obstacle.lifetime = 200
    ObstaclesGroup.add(obstacle)
  }

}

function spawnMonster(){

  if(frameCount%475 === 0){
    var monster = createSprite(1000, 460, 10, 10)
    monster.velocityX = -(15 + 2.5*score/30)
    var ran = Math.round(random(1,2))
    switch(ran){
      case 1:
      monster.addAnimation('mo1', monsterImg)
      monster.scale = 0.1
      monster.setCollider('circle', -400, 0, 450)
      break;
      case 2:
      monster.addAnimation('mo2', monsterImg2)
      monster.scale = 0.5
      break;     
      }
        
    monster.lifetime = 100

    MonsterGroup.add(monster)
  }

}

function reset(){

  gameState = PLAY

  s7.play()

  restart.visible = false
  gameOver.visible = false
  th.visible = false

  frameCount = 0
  planeFrame = 0
  ff = 0

  player.changeAnimation('pl2', playerImg)
  player.scale = 0.5

  ObstaclesGroup.destroyEach()
  MonsterGroup.destroyEach()
  bulletGroup.destroyEach()

  bulletCount = 3

  score = 0

  bulletButton.show()
  change1.show()
}

function bulletKill(){

bulletButton.mousePressed(()=>{
  if(bulletCount >= 1 && bulletCount <= 3){
    bullet = createSprite(140, 470, 30, 30)
    bullet.addImage('b1', bulletImg)
    bullet.scale = 0.3
    bullet.velocityX = 10
    bullet.lifetime = 100
    s4.play()
    bulletCount = bulletCount-1
    bulletGroup.add(bullet)
    
  }

  if(bulletCount === 0){
    bulletFrame = frameCount
    bulletButton.hide()
  }

})


  if(bulletFrame+450 === frameCount && bullet){
    bulletCount = 3
    bulletButton.show()
    s8.play()
    }    
}

