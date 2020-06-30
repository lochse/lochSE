cc.Class({
    extends: cc.Component,

    properties: {
        //购买物品的提示 的文本框节点
        tipLabel:cc.Node,
    },

    onLoad: function() {
        // 初始化不透明度为完全不透明
        this.node.opacity = 255;
        
        // 弹进动画
        // 从初始状态 变化成 括号中的状态(255完全不透明，用时0.3, 坐标(180,305)  )
        var actionFadeIn =cc.spawn(cc.fadeTo(0.3, 255) , cc.moveTo(0.3,cc.v2(180,305) )  );

        // 弹出动画，还原成初始状态，渐透明1.1s
        var actionFadeOut = cc.spawn(cc.fadeTo(1.1, 0) );
        // 弹出动画，还原成初始状态，移动到坐标（180，200）
        var actionFadeOut2 = cc.spawn(cc.moveTo(0.1,cc.v2(180, 200) ) );
        var self = this;
        // 弹出动画后回调 移除弹出层，对话框其实没有消失，只是变透明了，如果不移除，会屏蔽底层点击事件
        var finished = cc.callFunc(function(){
            self.node.removeFromParent(false);
        }, this);

        //定义了一个动作组，有时间顺序的
        this.fadeOutFinish = cc.sequence(actionFadeIn, actionFadeIn, actionFadeOut, actionFadeOut2, finished);

    },

    //@param str 浮动显示的字符串
    showTip: function(str){
        
        var self = this;
        self.tipLabel.getComponent(cc.Label).string=str;
        //设置父节点是canvas
        var scene = cc.director.getScene();
        self.node.parent = scene;
        this.node.setPosition(180,200);
        
        //提示框出现，消失
        this.node.runAction(this.fadeOutFinish);
        
    },  

});