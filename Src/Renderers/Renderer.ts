namespace VERVE {

    export class Renderer {
        public canvas:HTMLCanvasElement;
        constructor(CanvasId?:string) {
            this.canvas = new Canvas().getCanvas(CanvasId);
            
        }

        public update():void {

        }
        public render():void {
            gl.clearColor(Math.random(), Math.random(), Math.random(), 1);
            gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);  
        }
    }
}