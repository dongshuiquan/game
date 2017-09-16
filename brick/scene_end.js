var SceneEnd = function(game) {
    var s = {
        game: game,

    }


    s.draw = function() {
       //draw labels
       game.context.fillText('游戏结束 ！', 150, 150)
    }
    s.update = function() {

    }
    // mouse event


    return s
}
