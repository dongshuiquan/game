var Block = function(position) {
    // 位置参数，[0, 0]格式
    var image = imageFromPath('block.png')
    var p = position
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        w: 50,
        h: 20,
        alive: true,
        lifes: p[2] || 1,
    }
    o.kill = function() {
        o.lifes--
        if(o.lifes < 1) {
            o.alive = false
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
            return o.alive
        }
        return false
    }

    return o
}
