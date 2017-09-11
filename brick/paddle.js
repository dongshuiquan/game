var Paddle = function() {
    var image = imageFromPath('paddle.png')
    var o = {
        image : image,
        x : 100,
        y : 250,
        speed : 5,
    }
    o.moveLeft = function() {
       o.x -= o.speed
       if(o.x < 0) {
           o.x = 0
       }
    }
    o.moveRight = function() {
        o.x += o.speed
        if(o.x + o.image.width > 400) {
            o.x = 400 - o.image.width
        }
    }
    o.collide = function(ball) {
        x1 = o.x
        y1 = o.y
        x2 = o.x + o.image.width
        y2 = o.y + o.image.height

        x3 = ball.x
        y3 = ball.y
        x4 = ball.x + ball.image.width
        y4 = ball.y + ball.image.height

        minx = Math.max(x1,   x3)
        maxx = Math.min(x2,   x4)

        miny = Math.max(y1,   y3)
        maxy = Math.min(y2,   y4)
        if(minx < maxx &&  miny < maxy ) {
            return true
        }
        return false
    }
    return o
}
