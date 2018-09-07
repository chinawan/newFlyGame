cc.Class({
    extends: cc.Component,

    properties: {
        gametitle: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        let jump1 = cc.moveBy(2, cc.v2(0, 100)); 
        let jump2 = cc.moveBy(2, cc.v2(0, -100)); 
        let rep =  cc.repeatForever(cc.sequence(jump1, jump2));
        this.gametitle.runAction(rep)
        cc.director.preloadScene("gameScence", function () {
            cc.log("Next scene preloaded");
        });
    },

    // called every frame
    startbtn: function () {
         cc.director.loadScene('gameScence');
    },
});
