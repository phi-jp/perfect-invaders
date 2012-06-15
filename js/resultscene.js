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
        "crashplayer"   : "テキノコウゲキヲウケマシタ.トテモザンネンデス.",
        "missshot"      : "ミスショットデースネー.コノゲームデハユルサレナイヨ.",
        "timeover"      : "TIME OVER!",
    };
    

    ns.ResultScene = tm.createClass({
        
        superClass: tm.app.Scene,
        
        init: function(type) {
            this.superInit();
            
            
            this.title = tm.app.Label(TYPE_TITLE[type])
                .addChildTo(this)
                .setPosition(SCREEN_CENTER_X, 100).setWidth(SCREEN_WIDTH)
                .setFontSize(40).setFontFamily("Mosamosa").setAlign("center");
            
            this.msg = tm.app.Label(TYPE_MESSAGE[type])
                .addChildTo(this)
                .setPosition(SCREEN_CENTER_X, 200).setWidth(SCREEN_WIDTH)
                .setFontSize(25).setFontFamily("Mosamosa").setAlign("center");
            
            this.scoreLabel = tm.app.Label("SCORE:" + "5100")
                .addChildTo(this)
                .setPosition(SCREEN_CENTER_X, 300).setWidth(SCREEN_WIDTH)
                .setFontSize(40).setFontFamily("Mosamosa").setAlign("center");
            
            
            this.titleButton = tm.app.Label("BACK TITLE")
                .addChildTo(this)
                .setPosition(SCREEN_CENTER_X-160, 400).setWidth(200)
                .setFontSize(30).setFontFamily("Mosamosa").setAlign("center");
            this.titleButton.interaction.enabled = true;
            this.titleButton.interaction.boundingType = "rect";
            this.titleButton.onpointingover = function() { this.fillStyle = "red"; };
            this.titleButton.onpointingout  = function() { this.fillStyle = "white"; };
            this.titleButton.onpointingstart = function() {
                app.replaceScene(TitleScene());
            };
            
            this.tweetButton = tm.app.Label("TWEET RESULT")
                .addChildTo(this)
                .setPosition(SCREEN_CENTER_X+160, 400).setWidth(200)
                .setFontSize(30).setFontFamily("Mosamosa").setAlign("center");
            this.tweetButton.interaction.enabled = true;
            this.tweetButton.interaction.boundingType = "rect";
            this.tweetButton.onpointingover = function() { this.fillStyle = "red"; };
            this.tweetButton.onpointingout  = function() { this.fillStyle = "white"; };
            this.tweetButton.onpointingstart = function() {
                this.tweet();
            }.bind(this);
        },
        
        update: function(app) {
        },
        
        tweet: function() {
            
        },
        
        onblur: function() {
            app.pushScene(PauseScene());
        }
    });

})(window);