/// <reference path="Src/Game/Scene.ts"/>
/// <reference path="Src/Game/Component/SpriteComponent.ts"/>
/// <reference path="Src/Game/Component/ShapeComponent.ts"/>
/// <reference path="Src/Core/Geometry/PlaneGeometry.ts"/>
/// <reference path="Src/Core/Geometry/CircleGeometry.ts"/>
/// <reference path="Src/Core/Geometry/EllipseGeometry.ts"/>
/// <reference path="Src/Core/Color/Color.ts"/>
let imageForTexture = new Image();
imageForTexture.src = `Assets/Textures/star2.png`;
let renderer = new VERVE.Renderer("canvas");
let camera = new VERVE.Camera(0, renderer.canvas.width, renderer.canvas.height, 0);

let renderer2 = new VERVE.Renderer();
document.body.appendChild(renderer2.canvas)
renderer2.setCamera(camera)
renderer.setCamera(camera)
let scene = new VERVE.Scene();
// let scene2 = new VERVE.Scene();
let gameObject = new VERVE.GameObject();

let geomentry = new VERVE.PlaneGeometry(500, 500);
let material = new VERVE.BasicMaterial("#ff0000");
let texture = new VERVE.TextureMaterial(imageForTexture);
let spriteComponent = new VERVE.ShapeComponent(geomentry, material)

let geomentry2 = new VERVE.PlaneGeometry(200, 200);
let spriteComponent2 = new VERVE.SpriteComponent(geomentry2, texture)
spriteComponent2.x = 200;
spriteComponent2.y = 50;

let circle = new VERVE.CircleGeometry(100, 8);
let circleMaterial = new VERVE.BasicMaterial("#ff2556")
let spriteComponent3 = new VERVE.ShapeComponent(circle, circleMaterial);
let ellipse = new VERVE.EllipseGeometry(280, 100, 100);
let ellipseMaterial = new VERVE.BasicMaterial("#05a478");
let ellispeComponent = new VERVE.ShapeComponent(ellipse, ellipseMaterial);
let gameObject2 = new VERVE.GameObject();
gameObject2.addComponent(ellispeComponent);
gameObject2.addComponent(spriteComponent3);
// spriteComponent3.x = 400;
// spriteComponent3.y = 300;
gameObject2.x = 400;
gameObject2.y = 300;
gameObject.x = 300;
gameObject.y = 300;
spriteComponent3.rotate = Math.PI/4;
spriteComponent2.rotate = 20;
scene.addObject(gameObject2);
scene.addObject(gameObject);
gameObject.addComponent(spriteComponent2);
gameObject.addComponent(spriteComponent);

let scene2 = new VERVE.Scene();
scene2.addObject(gameObject)
// scene.addObject(spriteComponent2);
// scene2.addObject(spriteComponent2);
// ellispeComponent.rotate = Math.PI/2;
let updating = true;
material.color = "rbga(255, 255, 0, 40)";
function start() {
    
    requestAnimationFrame(start);
    if(updating)
    renderer.update();
    // renderer2.render(scene);
    renderer.render(scene);
    // spriteComponent2.x += 1;
    gameObject.rotate += 0.01;
    ellispeComponent.rotate -= 0.01;
    // gameObject2.rotate += 0.02;
    spriteComponent3.rotate += 0.01;
    spriteComponent2.rotate += Math.PI/180*1;
    // console.log(spriteComponent2.rotate)
}
VERVE.Color.getColor("rbga(255, 45, 78, 20)");
window.onload = ()=>{
    console.log(imageForTexture);
    renderer.tempFun();
    // renderer2.tempFun();
    start();
}