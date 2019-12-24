/// <reference path="Src/Game/Scene.ts"/>
/// <reference path="Src/Game/Component/SpriteComponent.ts"/>
/// <reference path="Src/Core/Geometry/PlaneGeometry.ts"/>
/// <reference path="Src/Core/Color/Color.ts"/>
let imageForTexture = new Image();
imageForTexture.src = `Assets/Textures/star2.png`;
imageForTexture.onload = ()=>{
    // renderer.temClass();
    // start();
}
let renderer = new VERVE.Renderer("canvas");
let camera = new VERVE.Camera(0, renderer.canvas.width, renderer.canvas.height, 0);

// let renderer2 = new VERVE.Renderer();
// document.body.appendChild(renderer2.canvas)
// renderer2.setCamera(camera)
renderer.setCamera(camera)
let scene = new VERVE.Scene();
// let scene2 = new VERVE.Scene();
let gameObject = new VERVE.GameObject();

let geomentry = new VERVE.PlaneGeometry(500, 500);
let material = new VERVE.BasicMaterial("#ff0000");
let texture = new VERVE.TextureMaterial(imageForTexture);
let spriteComponent = new VERVE.SpriteComponent(geomentry, material)

let geomentry2 = new VERVE.PlaneGeometry(200, 200);
let spriteComponent2 = new VERVE.SpriteComponent(geomentry2, texture)
spriteComponent2.x = 400;
spriteComponent2.y = 150;
// spriteComponent2.rotate = 20;
// spriteComponent2._transform.rotation.z += 0.8;
scene.addObject(gameObject);
gameObject.addComponent(spriteComponent2);
gameObject.addComponent(spriteComponent);

// scene.addObject(spriteComponent2);
// scene2.addObject(spriteComponent2);
let updating = true;
material.color = "rbga(255, 255, 0, 40)";
function start() {
    
    requestAnimationFrame(start);
    if(updating)
    renderer.update();
    // renderer2.render(scene);
    renderer.render(scene);
    // spriteComponent2.x += 1;
    // gameObject.rotate += 0.01;
    // spriteComponent2.rotate += Math.PI/180*1;
    // console.log(spriteComponent2.rotate)
}
VERVE.Color.getColor("rbga(255, 45, 78, 20)");
window.onload = ()=>{
    console.log(imageForTexture);
    renderer.tempFun();
    // renderer2.tempFun();
    start();
}