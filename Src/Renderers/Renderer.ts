namespace VERVE {

    export class Renderer {
        public canvas:HTMLCanvasElement;
        public gl:WebGLRenderingContext;
        // below is temparary code;
        private _shader:Shader; 
        private _sprite:Sprite; 
        private _camera:Camera;
        // end
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
        public tempFun():void {
            
        }
        public update():void {

        }
        public render(scene:Scene):void {
            this.gl.clearColor(1, 0, 1, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);  
            scene.BeforeRender(this);
            scene.render();
            
        }
    }
}