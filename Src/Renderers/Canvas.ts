namespace VERVE {
    export let gl:WebGLRenderingContext;
    export class Canvas {
       
        public getCanvas(canvasId?:string):HTMLCanvasElement {
            let canvas:HTMLCanvasElement;
            if(canvasId==undefined) {
                canvas = document.createElement("canvas");
                if(canvas==undefined) {
                    throw new Error("Error in initialising canvas");
                }
                gl = canvas.getContext("webgl", {alpha:false});
                if(gl==undefined) {
                    throw new Error("Error in webgl context!")
                }
                return canvas;
            } else {
                canvas = document.getElementById(canvasId) as HTMLCanvasElement;
                if(canvas==undefined) {
                    throw new Error(`${canvasId} is not defined`);
                }
                gl = canvas.getContext("webgl", {alpha:false});
                if(gl==undefined) {
                    throw new Error("Error in webgl context!")
                }
                return canvas;
            }
        }
    } 
}