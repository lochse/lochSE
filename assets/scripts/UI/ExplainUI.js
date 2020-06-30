cc.Class({
    extends: cc.Component,

    properties: {
        play : cc.Node,
        thing: cc.Node,
        story: cc.Node,
        people: cc.Node,
    },

    hidePlay: function () {
        this.play.setPosition(0,1500);
    },

    hideThing: function () {
        this.thing.setPosition(0,1500);
    },

    hideStory: function () {
        this.story.setPosition(0,1500);
    },

    hidePeople: function () {
        this.people.setPosition(0,1500);
    },

    showPlay: function () {
        this.play.setPosition(180,300);
    },

    showThing: function () {
        this.thing.setPosition(180,300);
    },

    showStory: function () {
        this.story.setPosition(180,300);
    },

    showPeople: function () {
        this.people.setPosition(180,300);
    },

});
