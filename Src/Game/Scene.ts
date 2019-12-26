namespace VERVE {
    export class Scene {
        private _gameObject:GameObject[] = [];
        private _renderer:Renderer;
        private _sprite:Sprite; // temp;
        public isLoading:boolean = true;
        constructor() {
            
        }
        public BeforeRender(renderer:Renderer):void {
            // let camera = new Camera(0, renderer.canvas.width, renderer.canvas.height, 0);
            // // this._sprite = new Sprite(renderer.gl, Renderer._shader, 100, 100);
            // // this._sprite.load(renderer.gl);
            // let projectionLocation = renderer._shader.getUniformLocation("u_projectionView");
            // renderer.gl.uniformMatrix4fv(projectionLocation, false, new Float32Array(camera.projection.data));

        }
        public addObject(gameObject:GameObject):void {
            this._gameObject.push(gameObject);
        }
        public update(delta:number):void {
            for(let g of this._gameObject) {
                g.update(delta);
            }
        }
        public render(renderer:Renderer):void {
            // this._sprite.draw();
            for(let g of this._gameObject) {
                g.render(renderer);
                // console.log(45)
            }
        }
    }
}