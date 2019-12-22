namespace VERVE {

    export class Renderer {
        public canvas:HTMLCanvasElement;
        public gl:WebGLRenderingContext;
        // below is temparary code;
        public shader:Shader; 
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
            this.shader = new BasicShader(this.gl);
            this.shader.bind();
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
        public update():void {
            scene.update();
        }
        public render(scene:Scene):void {
            this.gl.clearColor(1, 0, 1, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT); 
            for(let object of scene._gameObject) {
                this.loadObject(object);
            }
            scene.render(this);
            
        }
    }
}