namespace VERVE {
    export class Scene {
        private _gameObject:SpriteComponent[] = [];
        private _renderer:Renderer;
        private _sprite:Sprite; // temp;
        
        constructor() {
            
        }
        public BeforeRender(renderer:Renderer):void {
            // let camera = new Camera(0, renderer.canvas.width, renderer.canvas.height, 0);
            // this._sprite = new Sprite(renderer.gl, Renderer._shader, 100, 100);
            // this._sprite.load();
            // let projectionLocation = renderer._shader.getUniformLocation("u_projectionView");
            // renderer.gl.uniformMatrix4fv(projectionLocation, false, new Float32Array(camera.projection.data));

        }
        public addObject(SpriteComponent:SpriteComponent):void {
            this._gameObject.push(SpriteComponent);
        }
        public update():void {

        }
        public render():void {
            // this._sprite.draw();
            for(let g of this._gameObject) {
                g.render();
                console.log(45)
            }
        }
    }
}