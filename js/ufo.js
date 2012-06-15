/*
 * ufo.js
 */

(function(ns) {
    
    ns.UnidentifiedFlyingObject = tm.createClass({
        superClass: tm.app.Sprite,
        
        init: function() {
            this.superInit(100, 100);
            
            this.canvas.clearColor("white");
        }
    });
    
})(window);