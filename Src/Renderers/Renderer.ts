namespace VERVE {

    export class Renderer {
        public canvas:HTMLCanvasElement;
        public gl:WebGLRenderingContext;
        // below is temparary code;
        public shader:Shader; 
        private _sprite:Sprite; 
        private _camera:Camera;
        // end
        private _startTime:number = 0;
        private _frames:number = 0;
        private _totalTime:number = 0;
        constructor(CanvasId?:string) {
            let canvasData = new Canvas(CanvasId);
            this.canvas = canvasData.getCanvas();
            this.gl = canvasData.getContext();
            this.init();
            
        }
        private init():void {
            this.shader = new BasicShader(this.gl);
            this.shader.bind();
            this.gl.enable(this.gl.BLEND);
            // this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        }
        public tempFun():void {
            
        }
        public setCamera(camera:Camera):void {
            let projectionLocation = this.shader.getUniformLocation("u_projectionView");
            this.gl.uniformMatrix4fv(projectionLocation, false, new Float32Array(camera.projection.data));
            let colorLocation = this.shader.getUniformLocation("u_color");
            this.gl.uniform4f(colorLocation, 1, 1, 1, 1); // wrong implementation should be changed;
        }
        private loadObject(gameObject:GameObject):void {
            if(gameObject.isLoading){
               
                gameObject.load(this.gl);
                
                console.log("working")
                gameObject.isLoading = false;
            }
        }
        private showFPS(delta:number):void {
            this._totalTime += delta;
            this._frames++;
            if(this._totalTime>1000) {
                console.log(this._frames);
                this._totalTime = 0;
                this._frames = 0;
            }
        }
        public update():void {
            let endTime = performance.now();
            let delta = endTime - this._startTime;
            scene.update(delta);
            // this.showFPS(delta);
            
            this._startTime = endTime;
        }
        public render(scene:Scene):void {
            // this.gl.colorMask(false, false, false, true);
            this.gl.clearColor(0, 1, 1, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT); 
            for(let object of scene._gameObject) {
                this.loadObject(object);
            }
            scene.render(this);
            
        }
    }
}