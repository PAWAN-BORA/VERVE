/// <reference path="Src/Game/Scene.ts"/>
/// <reference path="Src/Game/Component/SpriteComponent.ts"/>
/// <reference path="Src/Core/Geometry/PlaneGeometry.ts"/>
let imageForTexture = new Image();
imageForTexture.src = `Assets/Textures/star2.png`;
let renderer = new VERVE.Renderer("canvas");
// let renderer2 = new VERVE.Renderer();
// document.body.appendChild(renderer2.canvas)

let scene = new VERVE.Scene();
let geomentry = new VERVE.PlaneGeometry(500, 500);
let spriteComponent = new VERVE.SpriteComponent(geomentry, undefined)
scene.addObject(spriteComponent)
function start() {
    
    requestAnimationFrame(start);
    renderer.render(scene);
    // renderer2.render(0, 1, 0);
}
window.onload = ()=>{
    console.log(imageForTexture);
    renderer.tempFun();
    // renderer2.tempFun();
    start();
}