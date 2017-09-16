
var blocks = []
var enableDebugMode = function(game, enable) {
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
            blocks = loadLevel(game, Number(k))
        }
    })
}

// 控制速度
document.querySelector("#id-input-speed").addEventListener('input', function(event) {
    var input = event.target
    //log(event, input.value)
    window.fps = Number(input.value)  + 1
})

var loadLevel = function(game, n) {
    var level =  levels[n - 1]
    // log(level)
    blocks = []
    for(var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

  var __main = function() {
      var images = {
          ball: 'ball.png',
          block: 'block.png',
          paddle: 'paddle.png',
      }


      var score = 0

      var game = GuaGame(30, images, function(g){
          var paddle = Paddle(game)
          var ball = Ball(game)
          log(ball)

          paused = false
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

      })

      enableDebugMode(game, true)


  }
  __main()
