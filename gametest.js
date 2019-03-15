var myCharacter;

function startGame() {
  myGameArea.start();
	myGameArea.fadeIn();
  //line
  //line = new line(5, 300, 795, 300, "#AAAAAA", 5, "round");
  //grd = new linearGradient(60, 60, 140, 140, "Red", "White");
  //circle = new circle(100, 100, 40, 0, 2 * Math.PI, "#AA9999", grd);
  myCharacter = new character("up", myGameArea.canvas.width/2, myGameArea.canvas.height/2, 20, 0, 15);
	item = new object("item", 100, 100, 20, 0, 15);
	star = new object("item", 500, 200, 20, 0, 15);
  //text = new text(10, 330, "Hint: ", "#555555", "16px courier");
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 800;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
      e.preventDefault();
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = (e.type == "keydown");
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.keys[e.keyCode] = (e.type == "keydown");
      myCharacter.imgIndex = 0;
    })
  },
  stop : function() {
    clearInterval(this.interval);
  },    
  clearGraphic : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
	fadeIn : function(){
		ctx = myGameArea.context;
		ctx.globalAlpha = 0;
	}
}

function character(id, x, y, blur, offsetX, offsetY){
  this.x = x;
  this.y = y;
  this.direction = "";
  this.prevDir = "up";
  var img = document.getElementsByClassName(id)[0];
  this.img = img;
  this.width =  img.width;
  this.height = img.height;
  this.imgIndex = 0;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.drawImage(this.img, 0, 0);
    ctx.restore();
    this.direction = "";
  }
  this.newPos = function() {
    var speed = 3;
    if(this.direction){
      this.prevDir = this.direction;
      this.img = document.getElementsByClassName(this.direction)[Math.floor(this.imgIndex / 10)];
      if(this.direction === "right"){
        if(this.x < myGameArea.canvas.width - this.width){ this.x += speed; }
      }
      else if(this.direction === "left"){
        if(this.x > 0){ this.x -= speed; }
      }
      else if(this.direction === "up"){
        if(this.y > 0){ this.y -= speed; }
      }
      else if(this.direction === "down"){
        if(this.y < myGameArea.canvas.height - this.height){ this.y += speed; }
      }
      this.imgIndex = (this.imgIndex + 1 ) % 40;
    } else {
      this.imgIndex = 0;
      this.img = document.getElementsByClassName(this.prevDir)[0];
    }
  }
	this.touch = function(obj) {
		var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var objleft = obj.x;
    var objright = obj.x + (obj.width);
    var objtop = obj.y;
    var objbottom = obj.y + (obj.height);
    var touched = true;
    if ((mybottom < objtop) ||
    (mytop > objbottom) ||
    (myright < objleft) ||
    (myleft > objright)) {
      touched = false;
    }
    return touched;
  }
}
function object(id, x, y, blur, offsetX, offsetY){
  this.x = x;
  this.y = y;
	this.frame = 0;
  this.img = document.getElementsByClassName(id)[this.frame];
  this.width =  this.img.width;
  this.height = this.img.height;
  this.update = function(frame) {
    ctx = myGameArea.context;
    ctx.save();
		this.frame = frame;
		this.img = document.getElementsByClassName(id)[this.frame];
    ctx.translate(this.x, this.y);
    ctx.drawImage(this.img, 0, 0);
    ctx.restore();
  }
}
//arc(x,y,r,startangle,endangle)
function circle(x, y, r, start, end, stroke, color) {
  this.x = x;
  this.y = y; 
  this.r = r; 
  this.start = start; 
  this.end = end; 
  ctx.beginPath();
  ctx.strokeStyle = stroke;
  ctx.arc(this.x, this.y, this.r, this.start, this.end);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
}

//createRadialGradient(x,y,r,x1,y1,r1)
//createLinearGradient(x,y,x1,y1)
function linearGradient(x1, y1, x2, y2, startColor, endColor){
  var grd = ctx.createLinearGradient(x1, y1, x2, y2);
  grd.addColorStop(0, startColor);
  grd.addColorStop(1, endColor);
  return grd;
}

function line(x1, y1, x2, y2, color, width, cap){
  ctx = myGameArea.context;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = cap;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.lineWidth = 1; // reset
}


//fillText:filled, strokeText:no fill
//ctx.textAlign = "center";
function text(x, y, text, color, font){
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
}

function updateGameArea() {
	
	myGameArea.frameNo = (myGameArea.frameNo + 1) % 100;
  myGameArea.clearGraphic();
	
	if(ctx.globalAlpha < 1){ ctx.globalAlpha += 0.01; }
  if (myGameArea.keys && myGameArea.keys[37]) {myCharacter.direction = "left";}
  if (myGameArea.keys && myGameArea.keys[39]) {myCharacter.direction = "right"; }
  if (myGameArea.keys && myGameArea.keys[38]) {myCharacter.direction = "up"; }
  if (myGameArea.keys && myGameArea.keys[40]) {myCharacter.direction = "down"; }
  myCharacter.newPos();
  myCharacter.update();
	if(star){
		star.update(Math.floor(myGameArea.frameNo / 50));
	}
	if(item){
		if(myCharacter.touch(item)){
			delete item;
		} else {
			item.update(Math.floor(myGameArea.frameNo / 50));
		}
	}
}