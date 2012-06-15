/*
 * gamescene.js
 */


(function(ns) {
    

    ns.PauseScene = tm.createClass({
        
        superClass: tm.app.Scene,
        
        init: function() {
            this.superInit();
            
            var filter = tm.app.Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
            filter.setPosition(SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
            filter.canvas.clearColor("rgba(0, 0, 0, 0.75)");
            this.addChild(filter);
            
            
            var label = tm.app.Label("PERFECT INVADERS").addChildTo(this);
            label.setPosition(SCREEN_CENTER_X, 100);
            label.fontSize = 40;
            label.align = "center";
            label.fontFamily = "Mosamosa";
            label.width = SCREEN_WIDTH;
        },
        
        update: function(app) {
        },
        
        onfocus: function() {
            app.start();
        },
        
        onblur: function() {
            app.stop();
        },
        
        onpointingstart: function() {
            app.popScene();
        },
    });

})(window);