/*
 * param.js
 */


var FRAME_RATE      = 30;
var SCREEN_WIDTH    = 720;
var SCREEN_HEIGHT   = 480;
var SCREEN_CENTER_X = SCREEN_WIDTH/2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;


var PLAYER_WIDTH    = 30;
var PLAYER_HEIGHT   = 20;
var PLAYER_SPEED    = 4;

var BULLET_WIDTH    = 1;
var BULLET_HEIGHT   = 8;
var BULLET_SPEED    = 12;

var ALIEN_WIDTH     = 25;
var ALIEN_HEIGHT    = 20;
var ALIEN_SPEED     = 12;
var ALIEN_COL       = 5;
var ALIEN_ROW       = 11;
// var ALIEN_COL       = 1;
// var ALIEN_ROW       = 1;

var ALIEN_BULLET_WIDTH    = 4;
var ALIEN_BULLET_HEIGHT   = 8;
var ALIEN_BULLET_SPEED    = 8;


tm.preload(function() {
    
    tm.sound.SoundManager.add("alien-crash", "sound/alien_crash");
    tm.sound.SoundManager.add("shot", "sound/shot");
    tm.sound.SoundManager.add("ufo-crash", "sound/8");
    
    tm.sound.SoundManager.add("bgm0", "sound/bgm_se0");
    tm.sound.SoundManager.add("bgm1", "sound/bgm_se1");
    tm.sound.SoundManager.add("bgm2", "sound/bgm_se2");
    tm.sound.SoundManager.add("bgm3", "sound/bgm_se3");
    
    tm.util.DataManager.set("game-data", {
        time : 0,
        score: 0,
    });
});


var createBitmapImage = function(bitmapData, color) {
    var BITMAP = tm.graphics.Bitmap(bitmapData[0].length, bitmapData.length);
    for (var i=0; i<bitmapData.length; ++i) {
        var data =bitmapData[i];
        for (var j=0; j<data.length; ++j) {
            if (data[j] == '#') {
                BITMAP.setPixel32XY(j, i, color[0], color[1], color[2], 255);
            }
        }
    }
    
    var IMAGE = tm.graphics.Canvas();
    IMAGE.resize(BITMAP.width, BITMAP.height);
    IMAGE.drawBitmap(BITMAP, 0, 0, 0, 0, BITMAP.width, BITMAP.height);
    
    return IMAGE;
};


var LabelButton = tm.createClass({
    superClass: tm.app.Label,
    
    init: function(text, repeat, func) {
        this.superInit(text);
        
        this.alpha = 0.75;
        this.shadowColor = "white";
        this.shadowBlur = 0;
        this.interaction.enabled = true;
        this.interaction.boundingType = "rect";
        /*
        this.addEventListener("pointingstart", function() {
            this.alpha = 1.0;
        });
        this.addEventListener("pointingend", function() {
            this.alpha = 0.75;
        });
        */
        this.addEventListener("pointingover", function() {
            this.alpha = 1.0;
            this.shadowBlur = 5;
        });
        this.addEventListener("pointingout", function() {
            this.alpha = 0.75;
            this.shadowBlur = 0;
        });
        
        if (repeat) {
            this.addEventListener("pointingmove", func);
        }
        else {
            this.addEventListener("pointingstart", func);
        }
    }
});





