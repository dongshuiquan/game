

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
            log(k)
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
    blocks = []
    for(var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}
    var paused = false
  var __main = function() {
      var images = {
          ball: 'img/ball.png',
          block: 'img/block.png',
          paddle: 'img/paddle.png',
      }

      var game = GuaGame(30, images,function(game) {
         var scene = SceneTitle(game)
         game.replaceScene(scene)
      })
      enableDebugMode(game, true)

  }
  __main()
