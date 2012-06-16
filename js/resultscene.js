/*
 * resultscene.js
 */


(function(ns) {
    
    var TYPE_TITLE = {
        "gameclear"     : "GAME CLEAR!",
        "crashplayer"   : "GAME OVER!",
        "missshot"      : "GAME OVER!",
        "timeover"      : "TIME OVER!",
    };
    
    var TYPE_MESSAGE = {
        "gameclear"     : "スゴイ!マサカクリアスルニンゲンガアラワレルトハ!!",
        "crashplayer"   : "テキノコウゲキヲウケマシタ.アナタニハガッカリデス.",
        "missshot"      : "ミスショットデースネー.コノゲームデハユルサレナイヨ.",
        "timeover"      : "シッパイヲオソレテハダメ!シッパイシタラオワリナンダケドネ",
    };
    
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
                "type"      : "Label",
                "name"      : "msgLabel",
                
                "x"         : SCREEN_CENTER_X,
                "y"         : 190,
                "width"     : SCREEN_WIDTH, 
                "height"    : 50,
                "fillStyle" : "white",
                
                "text"      : "MSG",
                "align"     : "center",
                "baseline"  : "middle",
                "fontSize"  : 25,
                "fontFamily": "Mosamosa",
            },
            {
                "type"      : "Label",
                "name"      : "scoreLabel",
                
                "x"         : SCREEN_CENTER_X,
                "y"         : 285,
                "width"     : SCREEN_WIDTH, 
                "height"    : 50,
                "fillStyle" : "white",
                
                "text"      : "SCORE:",
                "align"     : "center",
                "baseline"  : "middle",
                "fontSize"  : 40,
                "fontFamily": "Mosamosa",
            },
            
            {
                "type"          : "LabelButton",
                "name"          : "backButton",
                
                "x"             : SCREEN_CENTER_X-160,
                "y"             : 390,
                "width"         : 200, 
                "height"        : 50,
                "fillStyle"     : "red",
                "shadowColor"   : "white",
                "shadowBlur"    : 5,
                
                "text"          : "BACK TITLE",
                "align"         : "center",
                "baseline"      : "middle",
                "fontSize"      : 25,
                "fontFamily"    : "Mosamosa",
            },
            
            {
                "type"          : "LabelButton",
                "name"          : "tweetButton",
                
                "x"             : SCREEN_CENTER_X+160,
                "y"             : 390,
                "width"         : 200, 
                "height"        : 50,
                "fillStyle"     : "blue",
                "shadowColor"   : "white",
                "shadowBlur"    : 5,
                
                "text"          : "TWEET RESULT",
                "align"         : "center",
                "baseline"      : "middle",
                "fontSize"      : 25,
                "fontFamily"    : "Mosamosa",
            },
        ]
    };
    

    ns.ResultScene = tm.createClass({
        
        superClass: tm.app.Scene,
        
        init: function(type) {
            this.superInit();
            
            // タイプを設定
            this.type = type;
            
            // ゲームデータ取得, 初期化
            this.gameData = tm.util.DataManager.get("game-data");
            
            // UI をセットアップ
            this.setupUI();
        },
        
        setupUI: function() {
            // UI
            this.fromJSON(UI_DATA);
            
            this.titleLabel.text    = TYPE_TITLE[this.type];
            this.msgLabel.text      = TYPE_MESSAGE[this.type];
            this.scoreLabel.text    = "SCORE:" + this.gameData.score;
            
            this.backButton.onpointingstart = function() {
                app.replaceScene(TitleScene());
            };
            this.tweetButton.onpointingstart = function() {
                this.dispatchEvent(tm.event.Event("tweet"));
            }.bind(this);
        },
        
        update: function(app) {
        },
        
        ontweet: function(type) {
            var msg = "『Perfect Invaders』 {0} Mode\nSCORE:{1}\n{2} {3}".format(
                this.gameData.mode.capitalizeFirstLetter(),
                this.gameData.score,
                TYPE_TITLE[this.type],
                TYPE_MESSAGE[this.type]
            );
            
            var url = tm.social.Twitter.createURL({
                type        : "tweet",
                text        : msg,
                hashtags    : "javascript,tmlibjs",
                url         : "https://github.com/phi1618/perfect-invaders",
            });
            
            window.open(url, "_self");
        },
        
        onblur: function() {
            app.pushScene(PauseScene());
        }
    });

})(window);