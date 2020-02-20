PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const stage = new PIXI.Container();

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
const canvas = document.getElementById(`canvas`);
const renderer = PIXI.autoDetectRenderer({
    forceCanvas: true,
    width: screenWidth,
    height: screenHeight,
    antialias: false,
    roundPixels: true,
    resolution:  1,
    view: canvas,
});

renderer.view.width = screenWidth;
renderer.view.height = screenHeight;
renderer.view.style.width = screenWidth + `px`;
renderer.view.style.height = screenHeight + `px`;
renderer.view.style.display = `block`;
renderer.view.style.position = `absolute`;
renderer.view.style.top = `0`;
renderer.view.style.left = `0`;
renderer.view.style.zIndex = `-1`;
renderer.backgroundColor = 0xffffff;

window.PLAYGROUND = {};
const PLAYGROUND = window.PLAYGROUND;
const assetPath = `../../../Assets`;
window.initPlayground = () => {
    return new Promise((resolve, reject) => {
        PIXI.loader.load((l, r) => {
            return resolve(true);
        });
    })
}

const updates = [];
function loop(timestamp) {
    let delta = (timestamp - lastTs) / 1000;
    updates.forEach(u => u(delta));
    renderer.render(stage);
    lastTs = timestamp;
    window.requestAnimationFrame(loop);
}

function update(fn) {
    updates.push(fn);
}

let lastTs = Date.now();
window.requestAnimationFrame(loop)