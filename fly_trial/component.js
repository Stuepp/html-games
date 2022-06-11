import * as index from 'index.js'

function component(width, height, color, x, y, type) {
    this.type = type
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y
    this.gamearea = myGameArea
}