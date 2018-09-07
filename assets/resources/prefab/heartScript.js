
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad(){
       cc.director.getCollisionManager().enabled = true;

    },
    onCollisionEnter: function (other, self) {
        self.node.active = false;
        progressNumber = progressNumber + 0.2;
        if (progressNumber > 1){
            progressNumber = 1
        }
        console.log('on collision enter');
    },

});
