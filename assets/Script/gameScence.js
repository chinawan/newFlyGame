import {sequence} from "../../creator";

cc.Class({
    extends: cc.Component,

    properties: {
        player :cc.Node,
        distanceBg1: cc.Node,
        distanceBg2: cc.Node,
        nearbyBg1: cc.Node,
        nearbyBg2: cc.Node,
        tiled :cc.TiledMap,
        heart:cc.Node,
        bigObstacle:cc.Node,
        airship:cc.Node,
        bird:cc.Node,
        BloodProgress:cc.ProgressBar
    },

    // use this for initialization
    onLoad: function () {
    	cc.director.getPhysicsManager().enabled = true;
    	this.node.on(cc.Node.EventType.TOUCH_START,this.on_touch_start,this);
        this.player.getComponent(cc.RigidBody).linearVelocity.y = 0;
        this.ongroundTime = 0;
        this.gameover = false;
    },

    start:function(){
        let heart = this.tiled.getObjectGroup('heart')
        let self = this;
        cc.loader.loadRes('prefab/heart', cc.Prefab, function (err, prefab) {
            if (err) {
                cc.log(err);
                return;
            }
            heart._objects.forEach(function (item,index) {
                let module = cc.instantiate(prefab);
                module.parent = self.heart;

                module.setPosition(parseInt(item.x) ,item.y)
            })

        });

        let bird = this.tiled.getObjectGroup('bird')
        cc.loader.loadRes('prefab/bird', cc.Prefab, function (err, prefab) {
            if (err) {
                cc.log(err);
                return;
            }
            bird._objects.forEach(function (item,index) {
                let module1 = cc.instantiate(prefab);
                module1.parent = self.bird;
                module1.setPosition(parseInt(item.x) ,item.y)
                //
                // module1.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.2, cc.v2(Math.random()*100 -50,Math.random()*50)),
                //     cc.moveBy(0.2, cc.v2(Math.random()*100 -50,-Math.random()*50)))))
            })

        });

        let airship = this.tiled.getObjectGroup('airship')
        cc.loader.loadRes('prefab/airship', cc.Prefab, function (err, prefab) {
            if (err) {
                cc.log(err);
                return;
            }
            airship._objects.forEach(function (item,index) {
                let module = cc.instantiate(prefab);
                module.parent = self.airship;
                module.setPosition(parseInt(item.x) ,item.y)
            })

        });

        let bigObstacle = this.tiled.getObjectGroup('bigObstacle')
        cc.loader.loadRes('prefab/bigObstacle', cc.Prefab, function (err, prefab) {
            if (err) {
                cc.log(err);
                return;
            }
            bigObstacle._objects.forEach(function (item,index) {
                let module = cc.instantiate(prefab);
                module.parent = self.bigObstacle;
                module.setPosition(parseInt(item.x) ,item.y)
            })

        });

    },

    on_touch_start:function(){
        this.player.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 300);
        TouchGroud = false;
        this.ongroundTime = 0
    },
    
    update:function (dt) {
        let self = this
        if (progressNumber<=0){
            if (!this.gameover){
                this.node.off(cc.Node.EventType.TOUCH_START,this.on_touch_start,this);
                cc.loader.loadRes('prefab/gameover', cc.Prefab, function (err, prefab) {
                    if (err) {
                        cc.log(err);
                        return;
                    }
                    let module = cc.instantiate(prefab);
                    module.parent = self.node;
                    module.setPosition(0,0)
                });
                this.gameover = true;
            }
            return
        }
        if (this.distanceBg2.getPosition().x <= 0){
            this.distanceBg1.setPosition(0,-140)
        }
        let x1 = this.distanceBg1.getPosition().x -  50*dt;
        let x2 = x1 + this.distanceBg1.getContentSize().width ;
        this.distanceBg1.setPosition(x1,-140)
        this.distanceBg2.setPosition(x2,-140)

        if (this.nearbyBg2.getPosition().x <= 0){
            this.nearbyBg1.setPosition(0,-70)
        }
        let x3 = this.nearbyBg1.getPosition().x -  100*dt;
        let x4 = x3 + this.nearbyBg1.getContentSize().width ;
        this.nearbyBg1.setPosition(x3,-70)
        this.nearbyBg2.setPosition(x4,-70)

        let x5 = this.tiled.node.getPosition().x - 150*dt;
        this.tiled.node.setPosition(x5,-336);
        if (TouchGroud){
            this.ongroundTime += dt
            if (this.ongroundTime>2){
                progressNumber = progressNumber - 0.1
                this.ongroundTime = 0
            }

        }
        this.BloodProgress.progress = progressNumber

    }

});
