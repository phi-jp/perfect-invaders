/*
 * gamescene.js
 */


(function(ns) {
    

    ns.GameScene = tm.createClass({
        
        superClass: tm.app.Scene,
        
        init: function() {
            this.superInit();
            
            // ゲームデータ取得, 初期化
            this.gameData = tm.util.DataManager.get("game-data");
            this.gameData.time  = 0;
            this.gameData.score = 0;
            
            // スコア生成
            this.scoreLabel = tm.app.Label("Score:" + "0000").addChildTo(this);
            this.scoreLabel
                .setPosition(50, 50).setWidth(SCREEN_WIDTH)
                .setFontSize(20).setFontFamily("Mosamosa");
            
            
            // UI
            this.leftButton = LabelButton("《", true, function() {
                this.player.x -= PLAYER_SPEED;
            }.bind(this));
            this.leftButton
                .addChildTo(this)
                .setPosition(70, 440).setSize(50, 50)
                .setFontSize(40).setFontFamily("Mosamosa").setAlign("center");
            
            this.rightButton = LabelButton("》", true, function() {
                this.player.x += PLAYER_SPEED;
            }.bind(this));
            this.rightButton
                .addChildTo(this)
                .setPosition(70+60, 440).setSize(50, 50)
                .setFontSize(40).setFontFamily("Mosamosa").setAlign("center");
            
            this.aButton = LabelButton("A", false, function() {
                var bullet = Bullet();
                bullet.setPosition(this.player.x, this.player.y);
                tm.sound.SoundManager.get("shot").play();
                
                app.currentScene.bulletGroup.addChild(bullet);
            }.bind(this));
            this.aButton
                .addChildTo(this)
                .setPosition(640, 440).setSize(50, 50)
                .setFontSize(40).setFontFamily("Mosamosa").setAlign("center");
            
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
            
            // this.onmissshot = null;
            //"あなたは地球レベルの規模ではありません.今すぐ宇宙に出て人類を救って下さい.";
        },
        
        update: function(app) {
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