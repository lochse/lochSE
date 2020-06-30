cc.Class({
    extends: cc.Component,

    properties: {
   
        RockerPointer:{
            type:cc.Node,
            default:null,
        },
        
        Max_r:150,
        direction:cc.v2(0,0)
    },

    start () {
        this.RockerPointer.on(cc.Node.EventType.TOUCH_START,function(e){
            //var w_pos = e.getLocation();
            //var pos = this.node.convertToNodeSpaceAR(w_pos);
            this.direction=this.node.convertToNodeSpaceAR(e.getLocation());
            var len = this.direction.mag();//获取向量长度
            if(len > this.Max_r){
                this.direction.x = this.Max_r * this.direction.x / len;
                this.direction.y = this.Max_r * this.direction.y / len;
            }
            this.RockerPointer.setPosition(this.direction);
        },this);
     
        this.RockerPointer.on(cc.Node.EventType.TOUCH_MOVE,function(e){
            //var w_pos = e.getLocation();
            //var pos = this.node.convertToNodeSpaceAR(w_pos);
            this.direction=this.node.convertToNodeSpaceAR(e.getLocation());
            var len = this.direction.mag();
            if(len > this.Max_r){
                this.direction.x = this.Max_r * this.direction.x / len;
                this.direction.y = this.Max_r * this.direction.y / len;
            }
            this.RockerPointer.setPosition(this.direction);
        },this);
     
        this.RockerPointer.on(cc.Node.EventType.TOUCH_END,function(e){
            this.direction.x=this.direction.y=0;
            this.RockerPointer.setPosition(0,0);
        },this);

        this.RockerPointer.on(cc.Node.EventType.TOUCH_CANCEL,function(e){
            this.direction.x=this.direction.y=0;
            this.RockerPointer.setPosition(0,0);
        },this);
    },

});

