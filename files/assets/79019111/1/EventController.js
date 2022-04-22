var EventController = pc.createScript('eventController');

// EventController.attributes.add('textUI', {type: 'entity'});

EventController.prototype.initialize = function() {
    this.app.on('talkWithCat', this.testAction, this);

    this.on('destroy', function() {
        this.app.off('talkWithCat', this.testAction, this);
    });
};

EventController.prototype.testAction = function() {
    console.log('talk with cat');
};