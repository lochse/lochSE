cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        elseLabel: cc.Label,
        myLabel: cc.Label,
        canFight: 0,
        touchLeft: 0,
        touchRight: 0,
        touchTop: 0,
        touchBottom: 0,
        followSpeed: 100,
        direction: cc.v2(0,0),
        preBlock: cc.Node,//当前楼
        textAlert: cc.Node,//文本框
        backGround: cc.Node,//文本背景
        textButton: cc.Node,//隐藏文本按钮
        haveSawText: false,//是否看过文本
        rocker:cc.Node//摇杆
    },

    onLoad: function () {
        var self = this;
        self.moveToPos = cc.v2(0, 0);
        self.isMoving = true;

        this.rocker.getComponent('rocker').RockerPointer.on(cc.Node.EventType.TOUCH_START,function(e){
            self.isMoving=true;
        },this)
    },

    onEnable: function () {
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        //cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    onCollisionEnter: function (other, self) {

        var o1 = self.getComponent("actor");
        
        if (other.node.group === 'portal'){
            this.isMoving = false;
            this.direction.x = this.direction.y=0;
                       
            var pairPortal = other.node.getComponent('portal').pairPortal;
            this.preBlock.getComponent('block').hide();//当前楼层隐藏
            this.preBlock = pairPortal.getComponent('portal').preBlock;//切换当前楼层为另一个楼层           
            this.preBlock.getComponent('block').show();
            
            //一定要保证主角的父节点的世界坐标是（0，0）或者没有父节点！！！，注意是世界
            var toPos = pairPortal.convertToWorldSpaceAR(pairPortal.getComponent('portal').exitDir);
            this.node.setPosition(toPos);
            o1.spaceNumber = this.preBlock.getComponent('block').blockNum;
            this.showAttribute();
        }

        else if(other.node.group === 'enemy'){
            this.canFight = -1;

            var o2 = other.getComponent("enemy");
            if(!o2.ifShow){
                this.isMoving = false;
                this.elseLabel.getComponent(cc.Label).string = 
                    "对方属性：\n"+
                    "攻击值："+o2.attack.toString()+"\n"+
                    "防御值："+o2.defend.toString()+"\n"+
                    "生命值："+o2.blood.toString()+"\n"+
                    "可获得经验值："+o2.experience.toString()+"\n";
                o2.ifShow = true;
            }
            else{
                var a_singleHurt = o1.attack - o2.defend;
                if(a_singleHurt > 0){ 
                    var e_singleHurt = o2.attack - o1.defend;
                    var a_times = Math.ceil(o2.blood/a_singleHurt);
                    if(e_singleHurt<=0||a_times <= Math.ceil(o1.blood/e_singleHurt)){
                        if(e_singleHurt<0) e_singleHurt=0;
                        this.canFight = 1;
                        o1.blood -= e_singleHurt*(a_times-1);
                        o1.experience += o2.experience;
                    }
                }
                if(this.canFight == 1){
                    this.isMoving = false;
                    this.showAttribute();
                    this.elseLabel.getComponent(cc.Label).string = 
                        "获得经验值："+o2.experience.toString()+"\n";
                    other.node.destroy();
                    this.canFight = 0;
                    return;
                }
                else if(this.canFight == -1){
                    this.elseLabel.getComponent(cc.Label).string = 
                        "对方属性：\n"+
                        "攻击值："+o2.attack.toString()+"\n"+
                        "防御值："+o2.defend.toString()+"\n"+
                        "生命值："+o2.blood.toString()+"\n"+
                        "可获得经验值："+o2.experience.toString()+"\n"+
                        "你打不过哦";
                    this.canFight = 0;
                }
            }
        }
        
        else if(other.node.group === 'npc'){
            this.isMoving = false;
            var o2 = other.getComponent("npc");

            if(o2.hasText&&o2.textBefore){
                this.textAlert.getComponent("label").change(o2.textBLabel.getComponent(cc.Label).string);
                this.showText();
                this.haveSawText=true;
                o2.textBefore=false;
            }
            else{
                var talklabel = o2.talkLabel.node.getComponent("label");
                if(o2.talkNum==3)
                    talklabel.change(o2.talkString3);
                else if(o2.talkNum==2)
                    talklabel.change(o2.talkString2);
                else if(o2.talkNum==1){
                    talklabel.change(o2.talkString1);
                    this.isMoving = true;
                }
                talklabel.show();
                if(o2.ifHide&&o2.talkNum==1) 
                    o2.hide();

                if(o2.talkNum==1&&o2.hasText&&o2.textAfter){
                    this.textAlert.getComponent("label").change(o2.textALabel.getComponent(cc.Label).string);
                    this.showText();
                    this.haveSawText=true;
                    o2.textAfter=false;
                }
                else if(o2.ifTurnBoss&&o2.talkNum==1){
                    other.node.group = 'enemy';
                    return ;
                }
                else if(o2.talkNum>1) o2.talkNum--;
            }
        }

        else if(other.node.group === 'obstacle'){
            if(o1.stoneNumber>=1){
                o1.stoneNumber--;
                this.elseLabel.getComponent(cc.Label).string = "消耗彩石数1";
                this.showAttribute();
                other.node.group = 'default';
                other.node.getComponent(cc.Sprite).spriteFrame = other.node.getComponent("spriteframe").another;
                return;
            }
            else{
                this.elseLabel.getComponent(cc.Label).string = "彩石数不足，无法通过";
            }
        }

        else if(other.node.group === 'gemstone'){
            this.isMoving = false;
            o1.attack += other.getComponent("gemstone").attack;
            o1.defend += other.getComponent("gemstone").defend;
            this.elseLabel.getComponent(cc.Label).string = 
                        "攻击值加"+other.getComponent("gemstone").attack.toString()+"\n"+
                        "防御值加"+other.getComponent("gemstone").defend.toString();
            this.showAttribute();
            other.node.destroy();
            return;
        }

        else if(other.node.group === 'medicine'){
            this.isMoving = false;
            o1.blood += other.getComponent("medicine").blood;
            this.elseLabel.getComponent(cc.Label).string = 
                        "生命值加"+other.getComponent("medicine").blood.toString();
            this.showAttribute();
            other.node.destroy();
            return;
        }

        else if(other.node.group === 'key'){
            this.isMoving = false;
            o1.stoneNumber += 1;
            this.elseLabel.getComponent(cc.Label).string = "彩石数加1";
            this.showAttribute();
            other.node.destroy();
            return;
        }

        // 1st step: get pre aabb, go back before collision
        //接下来两个是获取受碰撞的两个矩形
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();
        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();
        
        // 2nd step: forward x-axis, check whether collision on x-axis
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;
        
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.direction.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)) {
                this.node.x = otherPreAabb.xMax - this.node.parent.x + this.node.width/2 + 1;
                this.touchLeft++;
                other.touchingRight = true;
            }
            else if (this.direction.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {
                this.node.x = otherPreAabb.xMin - this.node.parent.x - this.node.width/2 - 1;
                this.touchRight++;
                other.touchingLeft = true;
            }
            return;
        }

        // 3rd step: forward y-axis, check whether collision on y-axis
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.direction.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                this.node.y = otherPreAabb.yMax - this.node.parent.y + this.node.height/2 + 1;
                this.touchBottom++;
                other.touchingTop = true;
            }
            else if (this.direction.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)) {
                this.node.y = otherPreAabb.yMin - this.node.parent.y - this.node.height/2 - 1;
                this.touchTop++;
                other.touchingBottom = true;
            }
            return;
        }    
        
    },

    onCollisionExit: function (other, self) {
        //新增

        if (other.touchingLeft) {
            other.touchingLeft = false;
            this.touchRight --;
        }
        else if(other.touchingRight) {
            other.touchingRight = false;
            this.touchLeft --;
        }
        else if(other.touchingTop) {
            other.touchingTop = false;
            this.touchBottom --;
        }
        else if(other.touchingBottom) {
            other.touchingBottom = false;
            this.touchTop --;
        }
    },

    update: function (dt) {
        if (!this.isMoving) return;
        var oldPos = this.node.position;
        // get move direction
        // normalize是归一化的向量形式(即向量的模长是1) 
        
        //下面这句是原有的更新方向
        //this.direction = this.moveToPos.sub(oldPos).normalize();

        //下面这句是新增的更新方向
        this.direction=this.rocker.getComponent('rocker').direction.normalize();

        //接下来不可少，线程不同步会出问题
        if(this.touchRight>0&&this.direction.x>0) this.direction.x=0;
        if(this.touchLeft>0&&this.direction.x<0) this.direction.x=0;
        if(this.touchTop>0&&this.direction.y>0) this.direction.y=0;
        if(this.touchBottom>0&&this.direction.y<0) this.direction.y=0;

        var newPos = oldPos.add(this.direction.mul(this.followSpeed * dt));
        this.node.setPosition(newPos);

        
    },

    showAttribute: function(){
        var o1 = this.getComponent("actor");
        this.myLabel.getComponent(cc.Label).string = 
                    "当前区域："+o1.spaceNumber.toString()+"\n"+
                    //"等级："+o1.level.toString()+"\n"+
                    "经验值："+o1.experience.toString()+"\n"+
                    "攻击值："+o1.attack.toString()+"\n"+
                    "防御值："+o1.defend.toString()+"\n"+
                    "生命值："+o1.blood.toString()+"\n"+
                    "持有彩石数："+o1.stoneNumber.toString()+"\n";
    },

    showText: function(){
        this.textAlert.setPosition(180,320);
        this.backGround.setPosition(180,320);
        this.textButton.setPosition(180,320);
    },

    hideText: function(){
        this.textAlert.setPosition(1000,-1000);
        this.backGround.setPosition(1000,-1000);
        this.textButton.setPosition(1000,-1000);
    },

});