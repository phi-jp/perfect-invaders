/*
 * main.js
 */

var app = null;

tm.main(function() {
    app = tm.app.CanvasApp("#world");
    app.fps = FRAME_RATE;
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);
    app.fitWindow();
    // app.enableStats();
    
    var titleScene = TitleScene();
    app.replaceScene(titleScene);
    
    app.run();
});

