cc.Class({
    extends: cc.Component,

    properties: {
        alertDialog: cc.Node,
        
        //这是打包过的资源_商店面板资源
        alertPrefab: cc.Prefab,
    },


    onLoad: function() {
        //将打包过的资源作为节点放在当前对象的属性上
        this.alertDialog = cc.instantiate(this.alertPrefab);
    },



    showAlert: function(actor,label){
        this.alertDialog.getComponent('shop').showAlert();
        this.alertDialog.getComponent('shop').setActor(actor);
        this.alertDialog.getComponent('shop').setMyLabel(label);
    },

});
