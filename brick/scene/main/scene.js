var Scene = function(game) {
    var s = {
        game: game,

    }

    var paddle = Paddle(game)
    var ball = Ball(game)
    var score = 0
    blocks = loadLevel(game, 1)

    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })
    s.draw = function() {
        // 背景
        game.context.fillStyle ='#666'
        game.context.fillRect(0, 0, 400, 300)

        // draw
       game.drawImage(paddle)
       game.drawImage(ball)
       for(var i = 0; i < blocks.length; i++) {
           var b = blocks[i]
           if(b.alive) {
               game.drawImage(b)
           }
       }
       //draw labels
       game.context.fillText('分数 :' + score, 10, 290)
    }
    s.update = function() {
        if(window.paused) {
            return
        }
        if(ball.y > paddle.y) {
            var end = SceneEnd(game)
            game.replaceScene(end)
        }
        ball.move()
        // 判断相撞
        if(paddle.collide(ball)) {
            ball.speedY *= -1
        }
        for(var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if(b.collide(ball)) {
                log('球撞了！')
                b.kill()
                //更新分数
                score += 100
                ball.rebound()
            }
        }
    }
    // mouse event
    var enableDrag = false
    game.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'down')
        // 检查是否点中了 ball
        if(ball.hasPoint(x, y)) {
            // 设置拖拽状态
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY

        if(enableDrag) {
            log(x, y, 'drag')
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'up')
       enableDrag = false
    })

    return s
}
