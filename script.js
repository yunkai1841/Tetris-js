var map, ctx, timer;
var shape, rotX, rotY;
var score = 0;
var speed = 300;
function init(){
    ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle = "black";
    map = Array(15);
    for(var i = 0; i < 15; i++) map[i] = Array(35);
    for(i = 0; i < 35; i++){
        for(var j = 0; j < 15; j++){
            map[j][i] = 0;
        }
    }
    for(i = 0; i < 35; i++){
        map[0][i] = 1;
        map[1][i] = 1;
        map[14][i] = 1;
        map[13][i] = 1;
    }
    for(i = 0; i < 15; i++){
        map[i][33] = 1;
        map[i][34] = 1;
    }
    shape = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]
    mainGame();
}

function block(type){
    // this.type = type;
    rotX = 1;
    rotY = 1;
    switch(type){
        case 1:
        shape = [
            [0, 0, 2, 0],
            [2, 2, 2, 0],
        ]
        break;
        case 2:
        shape = [
            [2, 0, 0, 0],
            [2, 2, 2, 0],
        ];
        // this.color = "orangered";
        break;
        case 3:
        shape = [
            [0, 3, 0, 0],
            [3, 3, 3, 0],
        ];
        // this.color = "purple";
        break;
        case 4:
        shape = [
            [0, 0, 0, 0],
            [4, 4, 4, 4],
        ]
        // this.color = "blueviolet";
        break;
        case 5:
        shape = [
            [0, 5, 5, 0],
            [5, 5, 0, 0],
        ];
        // this.color = "green";
        break;
        case 6:
        shape = [
            [0, 6, 6, 0],
            [0, 6, 6, 0],
        ];
        // 回転しない
        // this.color = "yellow"
        break;
    }
}

function rand(max, min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mainGame(){
    // 判定
    for(var i = 0; i <= 32; i++){
        var complete = 1;
        for(var j = 2; j <= 12; j++){
            if(map[j][i] == 0){
                complete = 0;
                break;
            }
        }
        if(complete){
            score += 1;
            document.getElementById("score-number").textContent = score;
            for(j = 2; j <= 12; j++){
                map[j][i] = 0;
            }
            repaint();
            for(j = i; j >= 0; j--){
                for(var k = 2; k <= 12; k++){
                    map[k][j] = map[k][j-1];
                    map[k][j-1] = 0;
                }
            }
            repaint();
        }
    }
    for(i = 2; i <= 12; i++){
        if(map[i][4] > 1){
            alert("Game Over!!");
            return;
        }
    }
    // 次のブロック
    block(rand(6, 1));
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 2; j++){
            map[i+6][j+3] = shape[j][i];
        }
    }
    rotX += 6;
    rotY += 3;
    timer = setInterval(fall, speed);
}

function canFall(){
    var ans = 1;
    for(var i = 12; i >= 1; i--){
        for(var j = 32; j >= 0; j--){
            if(map[i][j] >= 2 && map[i][j] <= 6){
                if(map[i][j+1] == 0) break;
                if(map[i][j+1] != 0) ans = 0;
            }
        }
    }
    return ans;
}
function fall(){
    if(canFall()){
        for(var i = 14; i >= 0; i--){
            for(var j = 34; j >= 0; j--){
                if(map[i][j] >= 2 && map[i][j] <= 6 && map[i][j+1] == 0){
                    map[i][j+1] = map[i][j];
                    map[i][j] = 0;
                }
            }
        }
        rotY++;
    }
    else{
        fix();
        clearInterval(timer);
        mainGame();
    }
    repaint();
}
function fix(){
    for(var i = 14; i >= 0; i--){
        for(var j = 34; j >= 0; j--){
            if(map[i][j] >= 2 && map[i][j] <= 6){
                map[i][j] += 5;
            }
        }
    }
}

function repaint(){
    ctx.clearRect(0, 0, 300, 600);
    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 30; j++){
            switch(map[i][j+5]){
                case 0:
                ctx.fillStyle = "aquamarine";
                ctx.fillRect(i*20, j*20, 20, 20);
                break;
                case 1:
                ctx.fillStyle = "black";
                ctx.fillRect(i*20, j*20, 20, 20);
                break;
                case 2:
                case 7:
                ctx.fillStyle = "orangered";
                ctx.fillRect(i*20, j*20, 20, 20);
                break;
                case 3:
                case 8:
                ctx.fillStyle = "purple";
                ctx.fillRect(i*20, j*20, 20, 20);
                break;
                case 4:
                case 9:
                ctx.fillStyle = "blueviolet";
                ctx.fillRect(i*20, j*20, 20, 20);
                break;
                case 5:
                case 10:
                ctx.fillStyle = "green";
                ctx.fillRect(i*20, j*20, 20, 20);
                break;
                case 6:
                case 11:
                ctx.fillStyle = "yellow";
                ctx.fillRect(i*20, j*20, 20, 20);
                break;
            }
        }
    }
    // ctx.fillStyle = "white";
    // ctx.beginPath();
    // ctx.arc(rotX*20+10, (rotY-5)*20+10, 10, 0, 2*Math.PI);
    // ctx.fill();
    // ctx.closePath();
}

window.onkeydown = function (e){
    // alert(e.keyCode);
    switch(e.keyCode){
        case 37:
        left();
        break;
        case 38:
        rotate();
        break;
        case 39:
        right();
        break;
        case 40:
        down();
        break;
    }
}

function canMoveLeft(){
    var ans = 1;
    for(var i = 0; i <= 32; i++){
        for(var j = 0; j <= 12; j++){
            if(map[j][i] >= 2 && map[j][i] <= 6){
                if(map[j-1][i] == 0) break;
                if(map[j-1][i] != 0) ans = 0;
            }
        }
    }
    return ans;
}
function left(){
    if(canMoveLeft()){
        for(var i = 0; i <= 32; i++){
            for(var j = 1; j <= 12; j++){
                if(map[j][i] >= 2 && map[j][i] <= 6){
                    map[j-1][i] = map[j][i];
                    map[j][i] = 0;
                }
            }
        }
        rotX--;     
    }
    repaint();
}
function canMoveRight(){
    var ans = 1;
    for(var i = 0; i <= 32; i++){
        for(var j = 12; j >= 1; j--){
            if(map[j][i] >= 2 && map[j][i] <= 6){
                if(map[j+1][i] == 0) break;
                if(map[j+1][i] != 0) ans = 0;
            }
        }
    }
    return ans;
}
function right(){
    if(canMoveRight()){
        for(var i = 0; i <= 32; i++){
            for(var j = 12; j >= 1; j--){
                if(map[j][i] >= 2 && map[j][i] <= 6){
                    map[j+1][i] = map[j][i];
                    map[j][i] = 0;
                }
            }
        } 
        rotX++;    
    }
    repaint();
}
var now = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
];
function canRot(){
    now = [
        {x: 0, y: 0},
        {x: 0, y: 0},
        {x: 0, y: 0},
        {x: 0, y: 0},
    ];
    var k = 0;
    for(var i = 0; i <= 32; i++){
        for(var j = 12; j >= 1; j--){
            if(map[j][i] >= 2 && map[j][i] <= 5){
                now[k].x = j;
                now[k++].y = i;
            }
        }
    }
    if(now[0].x == 0) return 0;
    var ans = 1;
    for(i = 0; i < 4; i++){
        var x = now[i].x;
        var y = now[i].y;
        if(map[rotX-y+rotY][rotY+x-rotX] != 0 &&
            map[rotX-y+rotY][rotY+x-rotX] != map[x][y]){
                ans = 0;
            }
    }
    return ans;
}
function rotate(){
    if(canRot()){
        var val = map[now[0].x][now[0].y];
        for(var i = 0; i < 4; i++){
            var x = now[i].x;
            var y = now[i].y;
            map[x][y] = 0;
        }
        for(var i = 0; i < 4; i++){
            x = now[i].x;
            y = now[i].y;
            map[rotX-y+rotY][rotY+x-rotX] = val;
        }
    }
    repaint();
}
function down(){
    if(canFall()){
        for(var i = 14; i >= 0; i--){
            for(var j = 34; j >= 0; j--){
                if(map[i][j] >= 2 && map[i][j] <= 6 && map[i][j+1] == 0){
                    map[i][j+1] = map[i][j];
                    map[i][j] = 0;
                }
            }
        }
        rotY++;
    }
    repaint();
}
