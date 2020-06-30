cc.Class({
    extends: cc.Component,

    properties: {
        talkNum: 3,
        talkString1: cc.String,
        talkString2: cc.String,
        talkString3: cc.String,
        talkLabel: cc.Label,
        textBLabel: cc.Label,
        textALabel: cc.Label,
        ifHide: false,
        hasText: false,
        textBefore: false,
        textAfter: false,
        ifTurnBoss:false
    },

    hide: function(){
        this.node.setPosition(1000,1000);
    },

});