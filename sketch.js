var player1,player2,position1,position2,database,pl1Animation,pl2Animation,player1Score,player2Score,gameState;
var track,trackImg;
function preload(){
    pl1Animation = loadImage("assets/player1a.png");
    pl2Animation = loadImage("assets/player2a.png");
    trackImg  = loadImage("track.jpg")
}
function setup(){
    database = firebase.database();
    createCanvas(600,600);

    player1 = createSprite(300,250,20,20);
    player1.addImage(pl1Animation);
    player1.scale  = 0.3;
    //player1.debug = true;
    player1.frameDelay = 2000;
    player1.setCollider("circle",0,0,60);


    player2 = createSprite(300,250,20,20);
    player2.addImage(pl2Animation);
    player2.scale  = 0.3;
    //player2.debug = true;
    player2.frameDelay = 2000;
    player2.setCollider("circle",0,0,60);

    var player1Position = database.ref('player1/position');
    player1Position.on("value",readPosition1);


    var player2Position = database.ref('player2/position');
    player2Position.on("value",readPosition2);

    gameState = database.ref('gameState/');
    gameState.on("value",readGS);

    player1Score= database.ref('playerScore1/');
    player1Score.on("value",readScore1);

    player2Score= database.ref('playerScore2/');
    player2Score.on("value",readScore2);

}

function draw(){
background(trackImg);
fill("white");
textSize(30);
text("RED: " + player1Score,150,50);
text("YELLOW: " + player2Score,360,50);

    if(gameState === 0){
                       
        fill("blue");
        text("Press Space To start",100,200);
        
     if(keyDown("space")){
        
       var r = Math.round(random(1,2));
     

        if(r === 1){

            database.ref('/').update({
                'gameState' :1,
                
            })

            alert("RED RIDE");
        }

        if(r === 2){

            database.ref('/').update({
                'gameState':2,
                
            })

            alert("YELLOW RIDE");
        }       
     }
     database.ref('player1/position').set({
        x:100,
        y: 300
    })
    database.ref('player2/position').set({
        x:500,
        y: 300
    })     
        
     }
    if(gameState === 1){
console.log(gameState);
       
            if(keyIsDown(UP_ARROW)){
                writePosition(0,-5);
            }
            if(keyDown(DOWN_ARROW)){
                writePosition(0,5);
            }
            if(keyDown(RIGHT_ARROW)){
                writePosition(5,0);
            }
            if(keyDown(LEFT_ARROW)){
                writePosition(-5,0);
            }
            if(keyDown("w")){
                writePosition2(0,-5);
            }
            if(keyDown("s")){
                writePosition2(0,5);
            }
            

            if(player1.x > 500){
                database.ref('/').update({
                    'playerScore1':player1Score-1,
                    'playerScore2':player2Score +1,
                    'gameState': 0,
                   
                })
                
                
                alert("YELLOW WINS")
                    gameState = 0;
            }
            if(player1.isTouching(player2)){
                database.ref('/').set({
                    'gameState': 0,
                    'playerScore1':player1Score+1,
                    'playerScore2':player2Score -1,
                   
                })
               
                
                    alert("RED WINS");
                    gameState = 0;
            }
    }

    if(gameState === 2){
       
            if(keyDown(UP_ARROW)){
                writePosition(0,-5);
            }
            if(keyDown(DOWN_ARROW)){
                writePosition(0,5);
            }
            if(keyDown("a")){
                writePosition2(-5,0);
            }
            if(keyDown("d")){
                writePosition2(5,0);
            }
            if(keyDown("w")){
                writePosition2(0,-5);
            }
            if(keyDown("s")){
                writePosition2(0,5);
            }
            

            if(player2.x <150){
                database.ref('/').update({
                    'playerScore1':player1Score+1,
                    'playerScore2':player2Score -1,
                    'gameState':0,
                   

                    
                })
               
                    alert("RED WINS");
                    gameState = 0;
               
            }
            if(player2.isTouching(player1)){
                database.ref('/').update({
                    'gameState': 0,
                    'playerScore1':player1Score-1,
                    'playerScore2':player2Score +1,
                    
                   
                })        
                
                    alert("YELLOW WINS");
                    gameState = 0;
            }
    }
    
    




    drawSprites();

}
function writePosition(x,y){
    database.ref('player1/position').set({
       'x' : position1.x + x,
       'y' : position1.y + y
    })
    

}
function writePosition2(x,y){
    database.ref('player2/position').set({
       'x':position2.x+x,
       'y':position2.y+y
    })
    

}
function readPosition1(data){
    position1 = data.val();
    player1.x = position1.x;
    player1.y = position1.y;
}
function readPosition2(data){
    position2 = data.val();
    player2.x = position2.x;
    player2.y = position2.y;
}
function readGS(data){
    gameState = data.val();
   
}
function readScore1(data1){
    player1Score = data1.val();
  
}
function readScore2(data2){
    player2Score = data2.val();
    
}