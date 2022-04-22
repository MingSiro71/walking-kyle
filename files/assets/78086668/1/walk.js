var Walk = pc.createScript('walk');

Walk.states = {
    idol: {
        animation: 'idol.mixamo.com.glb'
    },
    walk: {
        animation: 'walking.mixamo.com.glb'
    }
};

// initialize code called once per entity
Walk.prototype.initialize = function() {
    this.blendTime = 0.2;

    this.setState('idol');

    this.app.keyboard.on(pc.EVENT_KEYDOWN, this.run, this);
    this.app.keyboard.on(pc.EVENT_KEYUP, this.walk, this);
};

Walk.idol = function() {
    console.log('idol');
    this.setState('idol');
};

Walk.walk = function() {
    console.log('walk');
    this.setState('walk');
};

Walk.prototype.setState = function (state) {
    var states = Walk.states;

    this.state = state;
    // Set the current animation, taking 0.2 seconds to blend from
    // the current animation state to the start of the target animation.
    this.entity.animation.play(states[state].animation, this.blendTime);
};

// update code called every frame
Walk.prototype.update = function(dt) {
    const toIdol = () => {
        if (this.state !== 'idol') {
            this.setState('idol');
        }
    };

    const toWalk = () => {
        if (this.state !== 'walk') {
            this.setState('walk');
        }
    };

    const speed = 1.3;

    const isToLeft = this.app.keyboard.isPressed(pc.KEY_LEFT);
    const isToRight = this.app.keyboard.isPressed(pc.KEY_RIGHT);
    const isToUp = this.app.keyboard.isPressed(pc.KEY_UP);
    const isToDown = this.app.keyboard.isPressed(pc.KEY_DOWN);

    if (isToLeft && isToRight) {
        toIdol();
        return;
    }

    if (isToUp && isToDown) {
        toIdol();
        return;
    }

    if (isToLeft && isToUp) {
        this.entity.translate(-speed * dt, 0, -speed * dt);
        this.entity.setLocalEulerAngles(0, -135, 0);
        toWalk();
        return;
    } else if (isToLeft && isToDown) {
        this.entity.translate(-speed * dt, 0, speed * dt);
        this.entity.setLocalEulerAngles(0, -45, 0);
        toWalk();
        return;
    } else if (isToLeft) {
        this.entity.translate(-speed * dt, 0, 0);
        this.entity.setLocalEulerAngles(0, -90, 0);
        toWalk();
        return;
    }

    if (isToRight && isToUp) {
        this.entity.translate(speed * dt, 0, -speed * dt);
        this.entity.setLocalEulerAngles(0, 135, 0);
        toWalk();
        return;
    } else if (isToRight && isToDown) {
        this.entity.translate(speed * dt, 0, speed * dt);
        this.entity.setLocalEulerAngles(0, 45, 0);
        toWalk();
        return;
    } else if (isToRight) {
        this.entity.translate(speed * dt, 0, 0);
        this.entity.setLocalEulerAngles(0, 90, 0);
        toWalk();
        return;
    }

    if (isToUp) {
        this.entity.translate(0, 0, -speed * dt);
        this.entity.setLocalEulerAngles(0, 180, 0);
        toWalk();
        return;
    }

    if (isToDown) {
        this.entity.translate(0, 0, speed * dt);
        this.entity.setLocalEulerAngles(0, 0, 0);
        toWalk();
        return;
    }

    toIdol();
};

// swap method called for script hot-reloading
// inherit your script state here
// Walk.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// https://developer.playcanvas.com/en/user-manual/scripting/
