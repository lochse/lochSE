cc.Class({
    extends: cc.Component,

    properties: {

    },

    change: function(str){
        this.getComponent(cc.Label).string = str.toString();
    },

    show: function(){
        this.node.setPosition(180,100);
    },

    hide: function(){
        this.node.setPosition(0,1000);
    }
});
