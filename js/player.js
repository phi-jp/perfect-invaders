/*
 * player.js
 */


(function(ns) {
    
    var bitmapData = [
        "             ",
        "      #      ",
        "     ###     ",
        "     ###     ",
        "  #########  ",
        " ########### ",
        " ########### ",
        " ########### ",
        "             ",
    ];
    
    var bitmapData = [
        "                        ",
        "           ##           ",
        "           ##           ",
        "         ######         ",
        "         ######         ",
        "         ######         ",
        "         ######         ",
        "   ##################   ",
        "   ##################   ",
        " ###################### ",
        " ###################### ",
        " ###################### ",
        " ###################### ",
        " ###################### ",
        " ###################### ",
        "                        ",
    ];
    
    var IMAGE = createBitmapImage(bitmapData, [255, 255, 255]);
    
    ns.Player = tm.createClass({
        superClass: tm.app.Sprite,
        
        init: function() {
            this.superInit(PLAYER_WIDTH, PLAYER_HEIGHT);
            
            this.canvas.drawTexture(IMAGE, 0, 0, PLAYER_WIDTH, PLAYER_HEIGHT);
        },
        
        
        update: function(app) {
            /*
            if (app.keyboard.getKey("left"))    { this.x -= PLAYER_SPEED; }
            if (app.keyboard.getKey("right"))   { this.x += PLAYER_SPEED; }
            if (app.keyboard.getKeyDown("space"))   {
                var bullet = Bullet();
                bullet.setPosition(this.x, this.y);
                tm.sound.SoundManager.get("shot").play();
                
                if (app.currentScene.bulletGroup) {
                    app.currentScene.bulletGroup.addChild(bullet);
                }
            }
            */
        },
        
        onmoveleft: function() {
            this.x -= PLAYER_SPEED;
        },
        
        onmoveright: function() {
            this.x += PLAYER_SPEED;
        },
        
        onshot: function() {
            var bullet = Bullet();
            bullet.setPosition(this.x, this.y);
            tm.sound.SoundManager.get("shot").play();
            
            if (app.currentScene.bulletGroup) {
                app.currentScene.bulletGroup.addChild(bullet);
            }
        },
    });
    
    
    ns.Bullet = tm.createClass({
        superClass: tm.app.Sprite,
        
        init: function() {
            this.superInit(BULLET_WIDTH, BULLET_HEIGHT);
            
            this.canvas.clearColor("white");
        },
        
        update: function(app) {
            this.y -= BULLET_SPEED;
            
            if (this.y <= -50) {
                this.remove();
                app.currentScene.dispatchEvent(tm.event.Event("missshot"));
            }
            
            // 敵との衝突判定
            if (!app.currentScene.enemyGroup) return ;
            var enemyList = app.currentScene.enemyGroup.children;
            for (var i=0,len=enemyList.length; i<len; ++i) {
                var enemy = enemyList[i];
                if (this.isHitElement(enemy) == true) {
                    this.remove();
                    enemy.remove();
                    
                    // クラッシュイベントを発行
                    enemy.dispatchEvent(tm.event.Event("crash"));
                    
                    // カレントシーンに敵を倒したことを通知
                    app.currentScene.dispatchEvent(tm.event.Event("defeatenemy"));
                    
                    // スコア加算
                    app.score += 100;
                    
                    // SE 再生
                    var se = tm.sound.SoundManager.get("alien-crash");
                    se.volume = 0.5;
                    se.play();
                    
                    
                    break;
                }
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
