var Cat = pc.createScript('cat');

Cat.prototype.initialize = function() {
    this.entity.collision.on("triggerenter", this.onCollisionStart, this);
};

Cat.prototype.onCollisionStart = function (result) {
    console.log('A');
    if( this.app.hasEvent('talkWithCat') ){
            console.log('B');
        this.app.fire('talkWithCat');
    }
};
