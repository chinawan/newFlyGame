
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad(){
        cc.director.preloadScene("gameScence", function () {
            cc.log("Next scene preloaded");
        });
    },
    
    onclickStart:function(){
        cc.log("--------start--------")
        progressNumber = 1
        this.node.removeFromParent()
        cc.director.loadScene('gameScence');
    }

});
