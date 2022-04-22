var Cat = pc.createScript('cat');

Cat.prototype.initialize = function() {
    this.entity.collision.on("triggerenter", this.onCollisionStart, this);
};

Cat.prototype.onCollisionStart = function (result) {
    if( this.app.hasEvent('talkWithCat') ){
        this.app.fire('talkWithCat');
    }
};
