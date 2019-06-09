var ExitType = cc.Enum({//出口方向
    Left: 0,
    Right: 1,
    Up: 2,
    Down: 3
 });
cc.Class({
    extends: cc.Component,
    properties: {
        //它的对偶传送门
        pairPortal:{
            default:null,
            type:cc.Node
        },
        //这个传送门本身的出口方向，注意不是对偶
        type: {
            default: ExitType.Left,
            type: ExitType
        },
        //出口方向的向量
        exitDir:cc.v2(0,0),
        preBlock:{
            default:null,
            type:cc.Node
        }
        
    },

    start: function () {
        var type=this.type;
        if(type === ExitType.Left){
            this.exitDir=cc.v2(-30,0);
        }else if(type === ExitType.Right){
            this.exitDir=cc.v2(30,0);
        }else if(type === ExitType.Up){
            this.exitDir=cc.v2(0,30);
        }else {
            this.exitDir=cc.v2(0,-30);
        }
    }

});
