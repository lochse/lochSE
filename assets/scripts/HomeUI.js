cc.Class({
    extends: cc.Component,

    properties: {
        //button group
        btnGroup: {
            default: null,
            type: cc.Node
        }
    },

    playGame: function () {
        this.btnGroup.pauseSystemEvents(true);
        cc.director.loadScene('Game');
    },

    endGame: function () {
        cc.game.end();
    },

    returnMenu: function () {
        this.btnGroup.pauseSystemEvents(true);
        cc.director.loadScene('Menu');
    },

});
