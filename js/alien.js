/*
 * alien.js
 */

(function(ns) {
    
    var BITMAP_DATA = [
        "          ",
        "    ##    ",
        "   ####   ",
        "  ######  ",
        " ## ## ## ",
        " ######## ",
        "   #  #   ",
        "  # ## #  ",
        " # #  # # ",
        "          ",
    ];
    
    var IMAGE = createBitmapImage(BITMAP_DATA, [255, 0, 0]);
    
    var IMAGE_LIST = {
        "green" : createBitmapImage(BITMAP_DATA, [0, 255, 0]),
        "cyan"  : createBitmapImage(BITMAP_DATA, [0, 255, 255]),
        "purple": createBitmapImage(BITMAP_DATA, [255, 0, 255]),
    };
    
    ns.Alien = tm.createClass({
        superClass: tm.app.Sprite,
        
        init: function(type) {
            this.superInit(ALIEN_WIDTH, ALIEN_HEIGHT);
            
            this.type = type;
            this.canvas.drawTexture(IMAGE_LIST[type] || IMAGE, 0, 0, ALIEN_WIDTH, ALIEN_HEIGHT);
            
            this.moveFrame = 0;
            this.moveSpeed = 10;
        },
        
        update: function(app) {
            if (app.frame % 20 == 0) {
                
                if (this.moveFrame <= 16) {
                    this.x += this.moveSpeed;
                }
                else {
                    this.y += 5;
                    this.moveFrame = 0;
                    this.moveSpeed *= -1;
                }
                ++this.moveFrame;
            }
            
            var r = tm.util.Random.randint(0, 1000);
            if (r<1) {
                var alienBullet = AlienBullet();
                app.currentScene.addChild(alienBullet);
                alienBullet.setPosition(this.x, this.y);
            }
        },
        
        oncrash: function() {
            var enemyCrash = AlienCrash(this.type).addChildTo(app.currentScene);
            enemyCrash.setPosition(this.x, this.y);
        },
    });
    
})(window);


(function(ns) {
    var BITMAP_DATA = [
        "     ",
        "  ##  ",
        "  ##  ",
        " ##   ",
        "##    ",
        " ##   ",
        "  ##  ",
        "   ## ",
        "  ##  ",
        " ##   ",
        "  ##  ",
        "  ##  ",
    ];
    
    var IMAGE = createBitmapImage(BITMAP_DATA, [255, 255, 255]);
    
    
    ns.AlienBullet = tm.createClass({
        superClass: tm.app.Sprite,
        
        init: function() {
            this.superInit(ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT);
            this.canvas.drawTexture(IMAGE, 0, 0, ALIEN_BULLET_WIDTH, ALIEN_BULLET_HEIGHT);
            
            //this.canvas.clearColor("white");
        },
        
        update: function(app) {
            this.y += ALIEN_BULLET_SPEED;
            
            if (this.y >= SCREEN_HEIGHT+50) this.remove();
            
            var player = app.currentScene.player;
            if (!player) return ;
            if (this.isHitElement(player) == true) {
                this.remove();
                player.remove();
                app.currentScene.dispatchEvent(tm.event.Event("crashplayer"));
            }
        },
        
        isHitElement: function(elm) {
            if (((this.x-elm.x)*(this.x-elm.x)+(this.y-elm.y)*(this.y-elm.y)) < (this.radius+elm.radius)*(this.radius+elm.radius)) {
                return true;
            }
            return false;
        }
    });

    
})(window);


(function(ns) {
    var BITMAP_DATA = [
        "               ",
        "  #  #   #  #  ",
        "   #  # #  #   ",
        "    #     #    ",
        " ##         ## ",
        "    #     #    ",
        "   #  # #  #   ",
        "  #  #   #  #  ",
        "               ",
    ];
    
    var IMAGE = createBitmapImage(BITMAP_DATA, [255, 0, 0]);
    
    var IMAGE_LIST = {
        "green" : createBitmapImage(BITMAP_DATA, [0, 255, 0]),
        "cyan"  : createBitmapImage(BITMAP_DATA, [0, 255, 255]),
        "purple": createBitmapImage(BITMAP_DATA, [255, 0, 255]),
    };
    
    
    ns.AlienCrash = tm.createClass({
        superClass: tm.app.Sprite,
        
        init: function(type) {
            this.superInit(ALIEN_WIDTH, ALIEN_HEIGHT);
            this.canvas.drawTexture(IMAGE_LIST[type] || IMAGE, 0, 0, ALIEN_WIDTH, ALIEN_HEIGHT);
            
            this.timer = 10;
            //this.canvas.clearColor("white");
        },
        
        update: function(app) {
            if (this.timer-- < 0) {
                this.remove();
            }
        },
    });

    
})(window);
