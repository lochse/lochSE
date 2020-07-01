cc.Class({
    extends: cc.Component,

    properties: {
        
        celButton: {//取消按钮，和回调有关
            type: cc.Node,
            default: null,
        },

    },

    onLoad: function() {
        //将打包过的_提示框资源_作为节点放在当前对象的属性上
        this.tipDialog = cc.instantiate(this.tipPrefab);

        // 初始化为2倍尺寸和完全不透明
        this.node.setScale(2);
        this.node.opacity = 255;

        // 弹出动画的 变量,还原为初始状态，即2倍大小，透明, 用时均为0.3s, 这个变量用在关闭购买框时
        var actionFadeOut = cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0));
        var self = this;
        // 弹出动画后回调 移除弹出层，对话框其实没有消失，只是变透明了，如果不移除，会屏蔽底层点击事件
        var finished = cc.callFunc(function(){
            self.node.removeFromParent(false);
        }, this);

        // 弹出动画接回调，干掉弹出层, 参数动作按顺序执行
        this.fadeOutFinish = cc.sequence(actionFadeOut,finished);
    },

    // 展示面板
    show: function(){
        var self = this;
        var scene = cc.director.getScene();
        self.node.parent = scene;
        // 弹进动画
        var actionFadeIn =cc.spawn(cc.fadeTo(0.3, 255), cc.scaleTo(0.3, 1.0));
        self.node.runAction(actionFadeIn);
    },

    //取消，按右上角 X 的按钮
    cancel: function(){
        this.node.runAction(this.fadeOutFinish);
    },

});
