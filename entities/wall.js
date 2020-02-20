class LineWall {
    constructor(p1, p2) {
        if(p1.x > p2.x) {
            this.p2 = p2;
            this.p1 = p1;
        } else {
            this.p2 = p1;
            this.p1 = p2;
        }
        this.sprite = new PIXI.Graphics();
        this.sprite.lineStyle(2, 0x0000ff)
            .moveTo(p1.x, p1.y)
            .lineTo(p2.x, p2.y);
        stage.addChild(this.sprite);
        this.angle = this._calculateAngle();
        this.slope = this._calculateSlope(p1.x, p1.y, p2.x, p2.y);
    }
    _calculateAngle() {
        var dy = this.p2.y - this.p1.y;
        var dx = this.p2.x - this.p1.x;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }
    _calculateSlope(x1, y1, x2, y2) {
        if(x1 === x2) return "vertical"
        return (y1 - y2) / (x1 - x2);
    }
}

function createWall(stage, p1, p2) {
    const wall = new LineWall(stage, p1, p2);
    return wall;
}