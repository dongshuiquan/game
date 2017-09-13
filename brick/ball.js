
 var Ball = function(game) {
     var o = game.imageByName('ball')
     o.x = 100
     o.y = 200
     o.speedX = 5
     o.speedY = 5
     o.fired = false
     o.fire = function() {
         o.fired = true
     }
     o.move = function() {
         if(o.fired) {
             //log('move')
             if(o.x < 0 || o.x > 400) {
                 o.speedX *= -1
             }
             if(o.y < 0 || o.y > 300) {
                 o.speedY *= -1
             }
             o.x += o.speedX
             o.y += o.speedY
         }
     }
     o.rebound = function() {
         o.speedY *= -1
     }
     return o
 }
