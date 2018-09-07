
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad(){
       cc.director.getCollisionManager().enabled = true;

    },
    onCollisionEnter: function (other, self) {
        console.log('on collision enter');
        progressNumber = progressNumber - 0.2;
    },

});
