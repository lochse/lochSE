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

    gameExplain: function () {
        this.btnGroup.pauseSystemEvents(true);
        cc.director.loadScene('Explain');
    },

    setting: function () {
        this.btnGroup.pauseSystemEvents(true);
        cc.director.loadScene('Setting');
    },

    endGame: function () {
        cc.game.end();
        wx.exitMiniProgram(cc.game);
    },

    returnMenu: function () {
        this.btnGroup.pauseSystemEvents(true);
        cc.director.loadScene('Menu');
    },

});
