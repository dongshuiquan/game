class GuaGame {
    // images 是一个对象，里面是图片的引用名字和图片路径
    // 程序会在所有图片载入成功后运行
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // event
        var self = this
        window.addEventListener('keydown', function(event) {
           self.keydowns[event.key] = true
        })
        window.addEventListener('keyup', event => {
           self.keydowns[event.key] = false
        })
        this.init()
    }

    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y)
    }
    // update
    update(){
        this.scene.update()
    }
    // draw
    draw () {
        this.scene.draw()
    }
    registerAction (key, callback) {
        this.actions[key] = callback
    }
    runloop () {
        //events
        var g = this
        var actions = Object.keys(g.actions)
        for(var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // 如果按键被按下，调用注册的 action
                g.actions[key]()
            }
        }
        //update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        //draw
        g.draw()
        //next run loop
        setTimeout(function() {
            g.runloop()
        }, 1000 / window.fps)
    }
    init () {
        var g = this
        var loads = []
        var names = Object.keys(g.images)
        for(var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                //存入 g.images 中
                g.images[name] = img
                loads.push(1)
                if(loads.length == names.length) {
                    g.run()
                }
            }
        }
    }
    imageByName (name) {
        // log('image by name', g.images)
        var g = this
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    run () {
        var g = this
        this.runCallback(this)

        // 开始运行程序
        setTimeout(function(){
            g.runloop()
        }, 1000/fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
}
