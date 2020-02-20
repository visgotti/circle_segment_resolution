function lineCircle(x1, y1, x2, y2, cx, cy, r) {

    // is either end INSIDE the circle?
    // if so, return true immediately
    var inside1 = pointCircle(x1,y1, cx,cy,r);
    var inside2 = pointCircle(x2,y2, cx,cy,r);
    if (inside1 || inside2) {

        var angle = Math.atan2((y1 - y2), (x1 - x2))

        return {
            collide: true,
            angle,
        }
    }

    // get length of the line
    var distX = x1 - x2;
    var distY = y1 - y2;
    var len = Math.sqrt( (distX*distX) + (distY*distY) );

    // get dot product of the line and circle
    var dot = ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) / Math.pow(len,2);

    // find the closest point on the line
    var closestX = x1 + (dot * (x2-x1));
    var closestY = y1 + (dot * (y2-y1));

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    var onSegment = linePoint(x1,y1,x2,y2, closestX,closestY);
    if (!onSegment) return false;

    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;
    var distance = Math.sqrt( (distX*distX) + (distY*distY) );

    if (distance <= r) {
        var angle = Math.atan2((y1 - y2), (x1 - x2));
        return {
            collide: true,
            angle,
           // hitPoint: { x: closestX, y: closestY },
        }
    }
    return false;
}
function getDistance(p1, p2) {
    return Math.sqrt( Math.pow((p1.x-p2.x), 2) + Math.pow((p1.y-p2.y), 2) );
};
function linePoint( x1,  y1,  x2, y2, px, py) {

    // get distance from the point to the two ends of the line
    var d1 = getDistance({x: px, y: py}, {x: x1, y: y1})
    var d2 = getDistance({x: px, y: py}, {x: x2, y: y2})

    // get the length of the line
    var lineLen = getDistance({x: x1, y: y1}, {x: x2, y: y2 });

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    var buffer = 0.1;    // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
        return true;
    }
    return false;
}

function pointCircle(px, py, cx, cy, r) {

    // get distance between the point and circle's center
    // using the Pythagorean Theorem
    var distX = px - cx;
    var distY = py - cy;
    var distance = Math.sqrt( (distX*distX) + (distY*distY) );

    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r) {
        return true;
    }
    return false;
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

