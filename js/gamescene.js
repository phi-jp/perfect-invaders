/*
 * gamescene.js
 */


(function(ns) {
    
    var TIME = 300;
    
    var UI_DATA = {
        "scoreLabel": {
            "type"      : "text",
            "rect"      : [120, 40, 300, 50],
            "color"     : "white",
            "fontSize"  : 20,
            "text"      : "Score:" + "0000",
        },
        "timerLabel": {
            "type"      : "text",
            "rect"      : [600, 40, 300, 50],
            "color"     : "white",
            "fontSize"  : 20,
            "text"      : "Time:" + "200",
        },
        "leftButton": {
            "rect"      : [70, 420, 80, 80],
            "color"     : "white",
            "fontSize"  : 50,
            "text"      : "《",
        },
        "rightButton": {
            "rect"      : [70+90, 420, 80, 80],
            "color"     : "white",
            "fontSize"  : 50,
            "text"      : "》",
        },
        "aButton": {
            "rect"      : [640, 420, 80, 80],
            "color"     : "white",
            "fontSize"  : 50,
            "text"      : "A",
        },
    }

    ns.GameScene = tm.createClass({
        
        superClass: tm.app.Scene,
        
        init: function(mode) {
            this.superInit();
            
            // ゲームデータ取得, 初期化
            this.gameData = tm.util.DataManager.get("game-data");
            this.gameData.timer = TIME*app.fps;
            this.gameData.score = 0;
            
            // UI
            for (var key in UI_DATA) {
                var data = UI_DATA[key];
                if (data.type == "text") {
                    this[key] = tm.app.Label(data.text).addChildTo(this);
                    this[key].setFillStyle(data.color);
                    this[key].setFontSize(data.fontSize);
                    this[key].setPosition(data.rect[0], data.rect[1]);
                    this[key].setSize(data.rect[2], data.rect[3]);
                    this[key].setFontFamily("Mosamosa").setAlign("center");
                }
                else {
                    this[key] = LabelButton(data.text).addChildTo(this);
                    this[key].setFillStyle(data.color);
                    this[key].setFontSize(data.fontSize);
                    this[key].setPosition(data.rect[0], data.rect[1]);
                    this[key].setSize(data.rect[2], data.rect[3]);
                }
            }
            
            this.leftButton.onpointingmove = function() {
                this.player.x -= PLAYER_SPEED;
            }.bind(this);
            
            this.rightButton.onpointingmove = function() {
                this.player.x += PLAYER_SPEED;
            }.bind(this);
            this.aButton.onpointingstart = function() {
                var bullet = Bullet();
                bullet.setPosition(this.player.x, this.player.y);
                tm.sound.SoundManager.get("shot").play();
                
                app.currentScene.bulletGroup.addChild(bullet);
            }.bind(this);
            
            
            // プレイヤーを生成
            this.player = Player().addChildTo(this);
            this.player.setPosition(SCREEN_WIDTH/2, SCREEN_HEIGHT-PLAYER_HEIGHT);
            
            // 敵を生成
            this.enemyGroup = tm.app.CanvasElement().addChildTo(this);
            for (var i=0; i<ALIEN_COL; ++i) {
                for (var j=0; j<ALIEN_ROW; ++j) {
                    var x = j*40;
                    var y = i*30;
                    var alien = Alien().addChildTo(this.enemyGroup);
                    alien.setPosition(x+160-80, y+80);
                }
            }
            
            // 弾リスト生成
            this.bulletGroup = tm.app.CanvasElement().addChildTo(this);
            
            // サウンドインデックス
            this.soundIndex = 0;
            
            if (mode === "normal") {
                this.onmissshot = null;
            }
            //"あなたは地球レベルの規模ではありません.今すぐ宇宙に出て人類を救って下さい.";
        },
        
        update: function(app) {
            this.timerLabel.text = "Time:" + (this.gameData.timer/app.fps).floor().padding(3, '0');
            this.gameData.timer -= 1;
            
            if (this.gameData.timer <= 0) { this.gameOver("timeover"); }
            
            if (app.frame%20 == 0) {
                tm.sound.SoundManager.get("bgm" + this.soundIndex).play();
                this.soundIndex += 1;
                this.soundIndex %= 4;
            }
        },
        
        gameClear: function() {
            app.replaceScene(ResultScene("gameclear"));
        },
        
        gameOver: function(type) {
            app.replaceScene(ResultScene(type));
        },
        
        ondefeatenemy: function(e) {
            this.gameData.score += 100;
            this.scoreLabel.text = "Score:" + this.gameData.score.padding(4, '0');
            
            if (this.enemyGroup.children.length <= 0) {
                this.gameClear();
            }
        },
        
        oncrashplayer: function(e) {
            this.gameOver("crashplayer");
        },
        
        onmissshot: function(e) {
            this.gameOver("missshot");
        },
        
        onblur: function() {
            app.pushScene(PauseScene());
        }
        
    });

})(window);