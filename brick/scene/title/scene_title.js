var SceneTitle = function(game) {
    var s = {
        game: game,

    }


    s.draw = function() {
       //draw labels
       game.context.fillText('按 k 开始游戏 ！', 150, 150)
    }
    s.update = function() {

    }
    // mouse event
    game.registerAction('k', function() {
        var s = Scene(game)
        game.replaceScene(s)
    })

    return s
}
