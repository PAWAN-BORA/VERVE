/// <reference path="Src/Game/Scene.ts"/>
/// <reference path="Src/Game/Component/SpriteComponent.ts"/>
/// <reference path="Src/Game/Component/AnimatedComponent.ts"/>
/// <reference path="Src/Game/Component/ShapeComponent.ts"/>
/// <reference path="Src/Core/Geometry/PlaneGeometry.ts"/>
/// <reference path="Src/Core/Geometry/CircleGeometry.ts"/>
/// <reference path="Src/Core/Geometry/EllipseGeometry.ts"/>
/// <reference path="Src/Core/Color/Color.ts"/>
let imageForTexture = new Image();
imageForTexture.src = `Assets/Textures/star2.png`;
let spriteImage = new Image();
spriteImage.src = `Assets/Textures/spriteSheet.png`;
let renderer = new VERVE.Renderer(800, 600, "canvas");
renderer.setInputEvents()
let camera = new VERVE.Camera(0, renderer.width, renderer.height, 0);

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
material.color = "rgba(255, 255, 0, 40)";
let animateMaterial = new VERVE.TextureMaterial(spriteImage);
let animateSprite = new VERVE.AnimatedComponent(108, 140, 2, 8, animateMaterial);
animateSprite.startAnimation = true;
let frameSequence1 = [
    {x:1, y:1},
    {x:2, y:1},
    {x:3, y:1},
    {x:4, y:1},
    {x:5, y:1},
    {x:6, y:1},
    {x:7, y:1},
    {x:8, y:1},
   
]
let frameSequence2 = [
    {x:1, y:2},
    {x:2, y:2},
    {x:3, y:2},
    {x:4, y:2},
    {x:5, y:2},
    {x:6, y:2},
    {x:7, y:2},
    {x:8, y:2},
]
let frameSequence3 = [
    {x:1, y:2},
]
animateSprite.setFrameSequence(frameSequence1);
animateSprite.frameTime = 100;
let gameObject3 = new VERVE.GameObject();
gameObject3.x = 320;
gameObject3.y = 190;
let phyPos = new VERVE.Vector2(400, 200);
let physicsObject = new VERVE.PhysicsObject(phyPos, new VERVE.Vector2(2, 0))
let shape = new VERVE.Circle(new VERVE.Vector2(0, 0), 50);
let body = new VERVE.Body(shape, 1.0, 20);
physicsObject.addBody(body);
let phy2 = new VERVE.Vector2(100, 210);
let physicsObject2 = new VERVE.PhysicsObject(phy2, new VERVE.Vector2(-2, 0));
let body2 = new VERVE.Body(new VERVE.Circle(new VERVE.Vector2(0, 0), 10), 1, 2);
physicsObject2.addBody(body2);
// physicsObject2.isCollidable  = true;
// console.log(physicsObject)
gameObject3.addComponent(animateSprite);
scene.addObject(gameObject3);
animateSprite.setMouse(physicsObject.shape);
// temp 
let physicesEngine = new VERVE.PhysicsEngine();
physicesEngine.addObjects(physicsObject)
physicesEngine.addObjects(physicsObject2)
let physics:VERVE.PhysicsObject[] = [];
for(let i=0; i<500; i++) {
    let x = Math.floor(Math.random()*8)-4;
    let y = Math.floor(Math.random()*8)-4;
    let pos = new VERVE.Vector2(400, 300);
    let phy = new VERVE.PhysicsObject(pos, new VERVE.Vector2(x, y));
    let body = new VERVE.Body(new VERVE.Circle(new VERVE.Vector2(0, 0), 4), 1, 1);
    phy.addBody(body);
    // physicesEngine.addObjects(phy);
}
scene.addObject(physicesEngine);
//
function start() {
    
    requestAnimationFrame(start);
    if(updating)
    renderer.update();
    // renderer2.render(scene);
    renderer.render(scene);
    // spriteComponent2.x += 1;
    
    gameObject.rotate += 0.01;
    gameObject4.rotate += 0.01;
    ellispeComponent.rotate -= 0.01;
    // gameObject2.rotate += 0.02;
    spriteComponent3.rotate += 0.01;
    spriteComponent2.rotate += Math.PI/180*1;
    physicsObject.update();
    physicsObject2.update();
    let pos = physicsObject.getPos();
    let pos2 = physicsObject2.getPos();
    // gameObject3.x = pos.x;
    // gameObject3.y = pos.y;
    // if(pos.x>renderer.width || pos.x<0) {
    //     // physicsObject.velocity.x = -physicsObject.velocity.x;
    //     if(physicsObject.velocity.x<0) {
    //         animateSprite.setFrameSequence(frameSequence2); 
            
    //     } else if(physicsObject.velocity.x>0){
    //         animateSprite.setFrameSequence(frameSequence1); 

    //     } else {
    //         animateSprite.setFrameSequence(frameSequence3);
    //     }
    // }
    // if(pos.y>renderer.height || pos.y<0) {
    //     physicsObject.velocity.y = -physicsObject.velocity.y;
    // }
    // if(pos2.x>renderer.width || pos2.x<0) {
    //     physicsObject2.velocity.x = -physicsObject2.velocity.x;
    // }
    // if(pos2.y>renderer.height || pos2.y<0) {
    //     physicsObject2.velocity.y = -physicsObject2.velocity.y;
    // }
    
    // physicsObject.render(renderer);
    // console.log(spriteComponent2.rotate)
}

VERVE.Color.getColor("rgba(255, 45, 78, 20)");
window.onload = ()=>{
    console.log(imageForTexture);
    renderer.tempFun();
    // renderer2.tempFun();
    start();
}
let textComponent:VERVE.TextComponent;
let content:string;
let gameObject4 = new VERVE.GameObject();
// gameObject4.scale(5, 5);
gameObject4.x = 300;
gameObject4.y = 200;
let fontImage = new Image();
fontImage.src =  `Assets/Font/font_0.png`;
let text = "THIS IS TEXT";
VERVE.FontLoader.load("Assets/Font/font.fnt", "arial", ()=>{
    textComponent = new VERVE.TextComponent(text, "arial");
    gameObject4.addComponent(textComponent);
});
VERVE.FontLoader.load("Assets/Font/comic_sans.fnt", "comic", ()=>{
    textComponent.changeFont("comic");
    textComponent.changeText("Text has been changed");
})
scene.addObject(gameObject4);
// let xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//     if(this.readyState==4 && this.status===200) {
//         content = xhttp.responseText;
//         textComponent = new VERVE.TextComponent(text, content, fontImage);
//         gameObject4.addComponent(textComponent);
//         // textComponent.x = -50;
//         scene.addObject(gameObject4);
//     } else {
//         console.log(this.readyState);
//         console.log(this.status);
//     }
// };
// xhttp.open("GET", "Assets/Font/font.fnt");
// xhttp.send();