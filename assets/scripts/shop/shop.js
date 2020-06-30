cc.Class({
    extends: cc.Component,
    
    properties: {
        hero:{//获取英雄属性
            type: cc.Node,
            default: null,
        },
        celButton: {//取消按钮，和回调有关
            type: cc.Node,
            default: null,
        },

        tipDialog: cc.Node,
        //这是打包过的资源_提示框面板_资源
        tipPrefab: cc.Prefab,

        myLabel: cc.Label
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

    //展示商店面板
    showAlert: function(){
        var self = this;
        var scene = cc.director.getScene();
        self.node.parent = scene;
        // 弹进动画
        var actionFadeIn =cc.spawn(cc.fadeTo(0.3, 255), cc.scaleTo(0.3, 1.0));
        self.node.runAction(actionFadeIn);
    },

    //设置脚本属性hero为actor节点
    setActor: function(actor){
        this.hero=actor;
    },

    setMyLabel: function(label){
        this.myLabel=label;
    },

    //以下几个都是按钮事件
    addLife: function(){
        var o1 = this.hero.getComponent("actor");
        if(o1.money >= 100){
            o1.blood +=50;
            o1.money -=100;
            //tip浮现：购买成功
            this.tipDialog.getComponent('tip').showTip("购买成功");
            this.showAttribute();
        }
        else{//展示提示：购买失败，钱不够
            this.tipDialog.getComponent('tip').showTip("铜钱不足，无法购买");
        }
    },
    addStone: function(){
        var o1 = this.hero.getComponent("actor");
        if(o1.money >= 200){
            o1.stoneNumber +=1;
            o1.money -=200;
            //tip浮现：购买成功
            this.tipDialog.getComponent('tip').showTip("购买成功");
            this.showAttribute();
        }
        else{//展示提示：购买失败，钱不够
            this.tipDialog.getComponent('tip').showTip("铜钱不足，无法购买");
        }
    },

    addAttack: function(){
        var o1 = this.hero.getComponent("actor");
        if(o1.money >= 250 && o1.experience>=20){
            o1.attack +=1;
            o1.money -=250;
            //tip浮现：购买成功
            this.tipDialog.getComponent('tip').showTip("购买成功");
            this.showAttribute();
        }
        else if(o1.money < 250){//展示提示：购买失败，钱不够
            this.tipDialog.getComponent('tip').showTip("铜钱不足，无法购买");
        }
        else if(o1.experience < 20){//展示提示：购买失败，经验不足
            this.tipDialog.getComponent('tip').showTip("经验不足，无法购买");
        }
    },

    addDefend: function(){
        var o1 = this.hero.getComponent("actor");
        if(o1.money >= 250 && o1.experience>=20){
            o1.defend +=1;
            o1.money -=250;
            //tip浮现：购买成功
            this.tipDialog.getComponent('tip').showTip("购买成功");
            this.showAttribute();
        }
        else if(o1.money < 250){//展示提示：购买失败，钱不够
            this.tipDialog.getComponent('tip').showTip("铜钱不足，无法购买");
        }
        else if(o1.experience < 20){//展示提示：购买失败，经验不足
            this.tipDialog.getComponent('tip').showTip("经验不足，无法购买");
        }
    },
    
    //取消，按右上角“打叉”的按钮
    cancel: function(){
        this.node.runAction(this.fadeOutFinish);
    },

    showAttribute: function(){
        var o1 = this.hero.getComponent("actor");
        this.myLabel.getComponent(cc.Label).string = 
                    "当前区域："+o1.spaceNumber.toString()+"\n"+
                    //"等级："+o1.level.toString()+"\n"+
                    "经验值："+o1.experience.toString()+"\n"+
                    "攻击值："+o1.attack.toString()+"\n"+
                    "防御值："+o1.defend.toString()+"\n"+
                    "生命值："+o1.blood.toString()+"\n"+
                    "持有彩石数："+o1.stoneNumber.toString()+"\n"+
                    "持有铜钱数："+o1.money.toString();
    },

});
