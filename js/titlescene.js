/*
 * resultscene.js
 */


(function(ns) {
    
    var UI_DATA = {
        "titleLabel": {
            "type"      : "text",
            "rect"      : [SCREEN_CENTER_X, 100, SCREEN_WIDTH, 50],
            "color"     : "white",
            "fontSize"  : 40,
            "text"      : "PERFECT INVADERS",
        },
        "perfectButton": {
            "rect"      : [SCREEN_CENTER_X, 200, 300, 50],
            "color"     : "red",
            "fontSize"  : 20,
            "text"      : "PERFECT MODE",
        },
        "normalButton": {
            "rect"      : [SCREEN_CENTER_X, 260, 300, 50],
            "color"     : "green",
            "fontSize"  : 20,
            "text"      : "NORMAL MODE",
        },
        "tweetButton": {
            "rect"      : [SCREEN_CENTER_X, 320, 300, 50],
            "color"     : "blue",
            "fontSize"  : 20,
            "text"      : "TWEET",
        },
        "textLabel": {
            "type"      : "text",
            "rect"      : [SCREEN_CENTER_X, 400, SCREEN_WIDTH, 50],
            "color"     : "white",
            "fontSize"  : 15,
            "text"      : "Left/Right arrow - move, SPACE - fire",
        },
    };
    
    ns.TitleScene = tm.createClass({
        
        superClass: tm.app.Scene,
        
        init: function(type) {
            this.superInit();
            
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
                text        : "『Perfect Invaders』\nプレイしてくれてありがとう",
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