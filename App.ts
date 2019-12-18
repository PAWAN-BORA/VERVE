let renderer = new VERVE.Renderer("canvas");

// document.body.appendChild(renderer.canvas)

function start() {
    
    requestAnimationFrame(start);
    renderer.render();
}
start();