var SceneEnd = function(game) {
    var s = {
        game: game,

    }


    s.draw = function() {
       //draw labels
       game.context.fillText('游戏结束 ！\r\n按 r 返回标题界面', 150, 150)
    }
    s.update = function() {

    }
    // mouse event
    game.registerAction('r', function() {
        var s = SceneTitle(game)
        game.replaceScene(s)
    })

    return s
}
