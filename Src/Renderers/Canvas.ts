namespace VERVE {
    // export let gl:WebGLRenderingContext;
    export class Canvas {
        private canvas:HTMLCanvasElement;
        private context:WebGLRenderingContext;
        public constructor(canvasId?:string) {
            this.canvas;
            if(canvasId==undefined) {
                this.canvas = document.createElement("canvas");
                if(this.canvas==undefined) {
                    throw new Error("Error in initialising canvas");
                }
                this.context = this.canvas.getContext("webgl", {alpha:false});
                if(this.context==undefined) {
                    throw new Error("Error in webgl context!")
                }
            } else {
                this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
                if(this.canvas==undefined) {
                    throw new Error(`${canvasId} is not defined`);
                }
                this.context = this.canvas.getContext("webgl", {alpha:false});
                if(this.context==undefined) {
                    throw new Error("Error in webgl context!")
                }
            }
        }
        public getCanvas():HTMLCanvasElement {
           return this.canvas;
        }
        public getContext():WebGLRenderingContext {
            return this.context;
        }
    } 
}