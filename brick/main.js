
var blocks = []
var enableDebugMode = function(enable) {
    if(!enable) {
        return
    }
    window.addEventListener('keydown', function() {
        var k = event.key
        //暂停
        if(k == 'p') {
            paused = !paused
        //载入关卡
        } else if("123".includes(k)) {
            blocks = loadLevel(Number(k))
        }
    })
}

// 控制速度
document.querySelector("#id-input-speed").addEventListener('input', function(event) {
    var input = event.target
    //log(event, input.value)
    window.fps = input.value + 1
})

var loadLevel = function(n) {
    var level =  levels[n - 1]
    blocks = []
    for(var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}

  var __main = function() {
      enableDebugMode(true)
      var score = 0

      var game = GuaGame(30)

      var paddle = Paddle()
      var ball = Ball()

      paused = false
      blocks = loadLevel(1)

      game.registerAction('a', function() {
          paddle.moveLeft()
      })
      game.registerAction('d', function() {
          paddle.moveRight()
      })
      game.registerAction('f', function() {
          ball.fire()
      })


      game.update = function() {
          if(paused) {
              return
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
      game.draw = function() {
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
  }
  __main()
