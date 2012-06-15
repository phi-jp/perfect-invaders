/*
 * resultscene.js
 */


(function(ns) {
    
    ns.TitleScene = tm.createClass({
        
        superClass: tm.app.Scene,
        
        init: function(type) {
            this.superInit();
            
            
            this.title = tm.app.Label("PERFECT INVADERS")
                .addChildTo(this)
                .setPosition(SCREEN_CENTER_X, 100).setWidth(SCREEN_WIDTH)
                .setFontSize(40).setFontFamily("Mosamosa").setAlign("center");
            
            this.perfect = LabelButton("PERFECT MODE", false, function() {
                app.replaceScene(GameScene("perfect"));
            });
            this.perfect
                .addChildTo(this)
                .setPosition(SCREEN_CENTER_X, 220).setWidth(300).setFillStyle("red")
                .setFontSize(20).setFontFamily("Mosamosa").setAlign("center");
            
            this.normal = LabelButton("NORMAL MODE", false, function() {
                app.replaceScene(GameScene("normal"));
            });
            this.normal
                .addChildTo(this)
                .setPosition(SCREEN_CENTER_X, 280).setWidth(300).setFillStyle("green")
                .setFontSize(20).setFontFamily("Mosamosa").setAlign("center");
            
            this.tweet = LabelButton("TWEET", false, function() {
                var url = tm.social.Twitter.createURL({
                    type        : "tweet",
                    text        : "プレイしてくれてありがとう",
                    hashtags    : "javascript,tmlibjs",
                    url         : "http://tmlife.net",
                    via         : "phi_jp",
                });
                window.open(url, "_self");
            });
            this.tweet
                .addChildTo(this)
                .setPosition(SCREEN_CENTER_X, 340).setWidth(300).setFillStyle("blue")
                .setFontSize(20).setFontFamily("Mosamosa").setAlign("center");
            
            
            
            this.text = tm.app.Label("Left/Right arrow - move, SPACE - fire")
                .addChildTo(this)
                .setPosition(SCREEN_CENTER_X, 400).setWidth(SCREEN_WIDTH).setFillStyle("white")
                .setFontSize(15).setFontFamily("Mosamosa").setAlign("center");
            
            return ;
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