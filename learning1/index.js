var myGamePiece;
var myObstacles = []
var myScore

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "AnnaLowTeard.jpg", 10, 120, 'image');
    //https://external-preview.redd.it/Lv6DN_40pJXtAwvDTjTtlrcETZMfoiXSWXQL9wq0z4Y.png?auto=webp&s=45bd59aadec863d5327df8cac3e86aceee617641
    myScore = new component('30px', 'Consolas', 'black', 280, 40, 'text')
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval)
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true }
    return false
}

function component(width, height, color, x, y, type) {
    this.type = type
    if (type == 'image') {
        this.image = new Image()
        this.image.src = color
    }
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == 'text') {
            ctx.font = this.width + ' ' + this.height
            ctx.fillStyle = color
            ctx.fillText(this.text, this.x, this.y)
        } if (type == 'image') {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (otherobj) {
        var myLeft = this.x
        var myRight = this.x + (this.width)
        var myTop = this.y
        var myBottom = this.y + (this.height)

        var otherleft = otherobj.x
        var otherRight = otherobj.x + (otherobj.width)
        var otherTop = otherobj.y
        var otherBottom = otherobj.y + (otherobj.height)

        var crash = true
        if ((myBottom < otherTop) ||
            (myTop > otherBottom) ||
            (myRight < otherleft) ||
            (myLeft > otherRight)) {
            crash = false
        }
        return crash
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap
    for (let i = 0; i < myObstacles.length; i++) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop()
            return
        }
    }
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) { myGamePiece.speedX = -2; }
    if (myGameArea.keys && myGameArea.keys[39]) { myGamePiece.speedX = 2; }
    if (myGameArea.keys && myGameArea.keys[38]) { myGamePiece.speedY = -2; }
    if (myGameArea.keys && myGameArea.keys[40]) { myGamePiece.speedY = 2; }
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
    myGameArea.frameNo += 1
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width
        minHeight = 20
        maxHeight = 200
        height = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight)
        minGap = 50
        maxGap = 200
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)
        myObstacles.push(new component(10, height, 'green', x, 0))
        myObstacles.push(new component(10, x - height - gap, 'green', x, height + gap))
    }
    for (let i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -1
        myObstacles[i].update()
    }
    myScore.text = 'SCORE: ' + myGameArea.frameNo / 100
    myScore.update()
    myGamePiece.newPos()
    myGamePiece.update()
}