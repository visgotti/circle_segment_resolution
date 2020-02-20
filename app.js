const stageLength = 1000;
const wallThickness = 20;

const player = createPlayer(25);
player.setPosition(50, 50)
const walls = [];
/*
If you want to create random line segments
const w = screen.innerWidth;
const h = screen.innerHeight;
for(let i = 0; i < 20; i++) {
    const pos1 = { x: getRandomNumber(0, w), y: getRandomNumber(0, h)};
    const pos2 = { x: getRandomNumber(pos1.x - 200, pos1.x + 200), y: getRandomNumber(pos1.y - 200, pos1.y + 200) }
    walls.push(createLineWall(stage, pos1, pos2))
}
 */

walls.push(createWall({ x: 100, y: 200}, { x: 300, y: 600}))
walls.push(createWall({ x: 100, y: 200}, { x: 110, y: 1000}))
walls.push(createWall({ x: 100, y: 200}, { x: 300, y: 201}))

walls.push(createWall({ x: 500, y: 755}, { x: 800, y: 901}))
walls.push(createWall({ x: 500, y: 355}, { x: 800, y: 0}))

walls.push(createWall({ x: 900, y: 600}, { x: 650, y: 200}))
walls.push(createWall({ x: 900, y: 1200}, { x: 650, y: 350}))
walls.push(createWall({ x: 900, y: 755}, { x: 650, y: 901}))

update((delta) => {
    player.update(delta);
    const collisions = getCollisions(delta);
    if(collisions.length) {
        resolvePositionFromCollisions(player.lastPosition, player.currentPosition, player.velocityX, player.velocityY, player.speed, collisions, delta);
    }
});


// this should return and x and y with the resolved position for where the player should be.
function resolvePositionFromCollisions(lastPlayerPosition, currentPlayerPosition, playerVelocityX, playerVelocityY, playerMaxSpeed, collisions, delta) {
    console.log('LAST PLAYER POSITION:', lastPlayerPosition);
    console.log('CURRENT PLAYER POSITION:', currentPlayerPosition);
    console.log('VELOCITY X:', playerVelocityX);
    console.log('VELOCITY Y:', playerVelocityY);
    console.log('MAX SPEED:', playerMaxSpeed);

    collisions.forEach(({ collisionAngle, segmentData }) => {
        const { p1, p2, angle } = segmentData;
        console.log('Collided with line segment:', segmentData);
        console.log('The collision angle was:', collisionAngle)
    });

    return { lastPlayerPosition }
}


function getCollisions(delta) {
    const circle = player.circle;
    const collisions = [];

    for(let i = 0; i < walls.length; i++) {
        const lineWall = walls[i];
        const collisionData = lineCircle(lineWall.p1.x, lineWall.p1.y, lineWall.p2.x, lineWall.p2.y, circle.x, circle.y, circle.radius)
        if(collisionData) {
            collisions.push({ segmentData: { p1: lineWall.p1, p2: lineWall.p2, angle: lineWall.angle }, collisionAngle: collisionData.angle })
        }
    }
    return collisions;
}
