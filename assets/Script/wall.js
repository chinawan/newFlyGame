
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad(){
       // cc.director.getCollisionManager().enabled = true;

    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        cc.log("-------1----------")
        TouchGroud = true
        progressNumber = progressNumber - 0.3
    },

});
