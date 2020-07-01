cc.Class({
    extends: cc.Component,

    properties: {
        prefablist: {
            default: [] ,
            type: [cc.Prefab],
        },
    },

    onLoad: function () {
        
    },

    showExplain: function (CustomEventData, idx) {
        // console.log(idx);
        var popupWindows = cc.instantiate(this.prefablist[idx]);
        popupWindows.getComponent('popupWindows').show();
    },

});
