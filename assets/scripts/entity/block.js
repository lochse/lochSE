cc.Class({
    extends: cc.Component,

    properties: {
        blockNum:1,//楼层号
        //它本来应该在的位置
        oldLoc:cc.v2(0,0)
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.oldLoc=cc.v2(1500*this.blockNum,0);
    },

    show: function(){
        this.node.setPosition(0,0);
    },

    hide: function(){
        this.node.setPosition(this.oldLoc);
    }

    // update (dt) {},
});
