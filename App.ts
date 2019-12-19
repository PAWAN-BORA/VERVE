let renderer = new VERVE.Renderer("canvas");
// let renderer2 = new VERVE.Renderer();
// document.body.appendChild(renderer2.canvas)

function start() {
    
    requestAnimationFrame(start);
    renderer.render();
    // renderer2.render();
}
start();