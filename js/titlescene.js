/*
 * resultscene.js
 */


(function(ns) {
    
    var UI_DATA = {
        children: [
            {
                "type"      : "Label",
                "name"      : "titleLabel",
                
                "x"         : SCREEN_CENTER_X,
                "y"         : 85,
                "width"     : SCREEN_WIDTH, 
                "height"    : 50,
                "fillStyle" : "white",
                
                "text"      : "PERFECT INVADERS",
                "align"     : "center",
                "baseline"  : "middle",
                "fontSize"  : 40,
                "fontFamily": "Mosamosa",
            },
            {
                "type"          : "LabelButton",
                "name"          : "perfectButton",
                
                "x"             : SCREEN_CENTER_X,
                "y"             : 200,
                "width"         : 300, 
                "height"        : 50,
                "fillStyle"     : "red",
                "shadowColor"   : "white",
                
                "text"          : "PERFECT MODE",
                "align"         : "center",
                "baseline"      : "middle",
                "fontSize"      : 20,
                "fontFamily"    : "Mosamosa",
            },
            {
                "type"          : "LabelButton",
                "name"          : "normalButton",
                
                "x"             : SCREEN_CENTER_X,
                "y"             : 260,
                "width"         : 300, 
                "height"        : 50,
                "fillStyle"     : "green",
                "shadowColor"   : "white",
                
                "text"          : "NORMAL MODE",
                "align"         : "center",
                "baseline"      : "middle",
                "fontSize"      : 20,
                "fontFamily"    : "Mosamosa",
            },
            {
                "type"          : "LabelButton",
                "name"          : "tweetButton",
                
                "x"             : SCREEN_CENTER_X,
                "y"             : 320,
                "width"         : 300, 
                "height"        : 50,
                "fillStyle"     : "blue",
                "shadowColor"   : "white",
                
                "text"          : "TWEET",
                "align"         : "center",
                "baseline"      : "middle",
                "fontSize"      : 20,
                "fontFamily"    : "Mosamosa",
            },
            {
                "type"      : "Label",
                "name"      : "textLabel",
                
                "x"         : SCREEN_CENTER_X,
                "y"         : 400,
                "width"     : SCREEN_WIDTH, 
                "height"    : 50,
                "fillStyle" : "white",
                
                "text"      : "Left/Right arrow - move, SPACE - fire",
                "align"     : "center",
                "baseline"  : "middle",
                "fontSize"  : 15,
                "fontFamily": "Mosamosa",
            },
            
        ]
    };
    
    ns.TitleScene = tm.createClass({
        
        superClass: tm.app.Scene,
        
        init: function(type) {
            this.superInit();
            
            // ゲームデータ取得, 初期化
            this.gameData = tm.util.DataManager.get("game-data");
            
            // UI
            this.fromJSON(UI_DATA);
            
            // 
            var buttonList = [this.perfectButton, this.normalButton, this.tweetButton];
            for (var i=0,len=buttonList.length; i<len; ++i) {
                var button = buttonList[i];
                button.addEventListener("pointingover", function() { this.shadowBlur = 5; });
                button.addEventListener("pointingout", function() { this.shadowBlur = 0; });
            }
            
            // perfect mode
            this.perfectButton.onpointingstart = function() {
                app.replaceScene(GameScene("perfect"));
            };
            
            this.normalButton.onpointingstart = function() {
                app.replaceScene(GameScene("normal"));
            };
            
            this.tweetButton.onpointingstart = function() {
                this.tweet();
            }.bind(this);
            
            return ;
        },
        
        update: function(app) {
        },
        
        tweet: function() {
            var url = tm.social.Twitter.createURL({
                type        : "tweet",
                text        : "『Perfect Invaders』\ntmlib.js を使ってインベーダーゲームを作りました. ドSゲーです. キミニクリアデキルカナ??",
                hashtags    : "javascript,tmlibjs",
                url         : "https://github.com/phi1618/perfect-invaders",
                via         : "phi_jp",
            });
            window.open(url, "_self");
        },
        
        onblur: function() {
            app.pushScene(PauseScene());
        }
    });

})(window);