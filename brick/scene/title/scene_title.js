class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // mouse event
        game.registerAction('k', function() {
            var s = Scene(game)
            game.replaceScene(s)
        })
    }
    draw () {
       //draw labels
      this.game.context.fillText('按 k 开始游戏 ！', 150, 150)
    }

}
