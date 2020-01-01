namespace VERVE {
    export class Scene {
        private _gameObjects: GameObject[] = [];
        public get gameObjects(): GameObject[] {
            return this._gameObjects;
        }
        public set gameObjects(value: GameObject[]) {
            this._gameObjects = value;
        }
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
            if(gameObject==undefined) {
                throw new Error(`game object is not define`)
            }
            this._gameObjects.push(gameObject);
        }
        public update(delta:number):void {
            for(let g of this._gameObjects) {
                g.update(delta);
            }
        }
        public render(renderer:Renderer):void {
            // this._sprite.draw();
            for(let g of this._gameObjects) {
                g.render(renderer);
                // console.log(45)
            }
        }
    }
}