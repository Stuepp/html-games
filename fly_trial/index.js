function startGame() {
    myGameArea.start()
}

let myGameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        this.canvas.width = 1260
        this.canvas.height = 500
        this.context = this.canvas.getContext('2d')
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
    }
}