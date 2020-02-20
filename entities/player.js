

class Player {
    constructor(diameter) {
        this.width = diameter;
        this.stage = stage;

        this.sprite = new PIXI.Graphics();
        this.sprite.beginFill(0x00ff00, 1);
        this.sprite.drawCircle(diameter / 2, diameter / 2, diameter / 2);
        this.sprite.endFill();
        this.stage.addChild(this.sprite)
        this.x = this.sprite.x;
        this.y = this.sprite.y;
        this.lastX = this.x;
        this.lastY = this.y;

        this.circle = {
            radius: diameter / 2,
            x: this.x + (diameter / 2),
            y: this.y + (diameter / 2),
        }


        this.centerSprite = new PIXI.Graphics();
        this.centerSprite.beginFill(0xffff00, 1);
        this.centerSprite.drawCircle(diameter / 2, diameter / 2, 2);
        this.centerSprite.endFill();
        this.stage.addChild(this.centerSprite)

        this.pressingRight = false;
        this.pressingLeft = false;
        this.pressingUp = false;
        this.pressingDown = false;

        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 205;
    }


    /* collisions = Array< {
         collisionAngle: number (Radians),
         segmentData: { p1: Array<{ x: number, y: number>}, p2: Array<{ x: number, y: number }, angle: number (Radians)
     }
     */
    // collisionData = Object { collision}


    setPosition(x, y) {
        this.sprite.x = x;
        this.x = x;
        this.circle.x = x + this.width / 2;
        this.sprite.y = y;
        this.y = y;
        this.circle.y = y + this.width / 2;
    }

    applyDeltas(deltaX, deltaY) {
        this.sprite.x += deltaX;
        this.sprite.y += deltaY;
        this.circle.x += deltaX;
        this.circle.y += deltaY;
        this.centerSprite.x = this.circle.x;
        this.centerSprite.y = this.circle.y;

        this.x = this.sprite.x;
        this.y = this.sprite.y;
    }

    update(delta) {
        this.velocityX = 0;
        this.velocityY = 0;

        if(this.pressingRight){
            this.velocityX += this.speed;
        }
        if(this.pressingLeft){
            this.velocityX -= this.speed;
        }
        if(this.pressingDown) {
            this.velocityY += this.speed;
        }
        if(this.pressingUp) {
            this.velocityY -= this.speed;
        }


        this.lastX = this.x
        this.lastY = this.y;

        const deltaX = this.velocityX * delta;
        const deltaY = this.velocityY * delta;
        this.applyDeltas(deltaX, deltaY);
    }
    get currentPosition() {
        return { x: this.x, y: this.y };
    }
    get lastPosition() {
        return { x: this.lastX, y: this.lastY };
    }
}

function createPlayer(diameter) {
    const _player = new Player(diameter);

    document.addEventListener("keydown", (e) => {
        switch(e.keyCode) {
            case 37:
                e.preventDefault();
                _player.pressingLeft = true;
                break;
            case 38:
                e.preventDefault();
                _player.pressingUp = true;
                break;
            case 39:
                e.preventDefault();
                _player.pressingRight = true;
                break;
            case 40:
                e.preventDefault();
                _player.pressingDown = true;
                break;
        }
    })
    document.addEventListener("keyup", (e) => {
        switch(e.keyCode) {
            case 37:
                e.preventDefault();
                _player.pressingLeft = false;
                break;
            case 38:
                e.preventDefault();
                _player.pressingUp = false;
                break;
            case 39:
                e.preventDefault();
                _player.pressingRight = false;
                break;
            case 40:
                e.preventDefault();
                _player.pressingDown = false;
                break;
        }
    })

    return _player;
}


