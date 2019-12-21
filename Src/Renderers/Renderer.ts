namespace VERVE {

    export class Renderer {
        public canvas:HTMLCanvasElement;
        public gl:WebGLRenderingContext;
        private _shader:Shader;
        private _sprite:Sprite; // temp;
        private _sprite2:Sprite // temp;
        constructor(CanvasId?:string) {
            let canvasData = new Canvas(CanvasId);
            this.canvas = canvasData.getCanvas();
            this.gl = canvasData.getContext();
            this.init();
            
        }
        private init():void {
            this._shader = new BasicShader(this.gl);
            this._shader.bind();
        }
        public temClass():void {
            this._sprite = new Sprite(this.gl, this._shader, 100, 100);
            this._sprite2 = new Sprite(this.gl, this._shader, 0, 100);
            this._sprite.load(imageForTexture)
            this._sprite2.load();
        }
        public update():void {

        }
        public render():void {
            this.gl.clearColor(1, 0, 1, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);  
            this._sprite2.render();
            this._sprite.render();
        }
    }
}