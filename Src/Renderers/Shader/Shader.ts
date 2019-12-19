namespace VERVE {

    export class Shader {
        private _name:string;
        private _program:WebGLProgram;
        private _gl:WebGLRenderingContext;
        constructor(name:string, gl:WebGLRenderingContext) {
            this._name = name;
            this._gl = gl;
        }
        protected laod(vertexSource:string, fragmentSource:string){
            let vertexShader = this.loadShader(vertexSource, this._gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, this._gl.FRAGMENT_SHADER);
            this.makeProgram(vertexShader, fragmentShader);
        }
        public bind():void{
            this._gl.useProgram(this._program);
        }
        private loadShader(source:string, shaderType:number):WebGLShader {
            let shader = this._gl.createShader(shaderType);
            this._gl.shaderSource(shader, source);
            this._gl.compileShader(shader);
            if(!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
                throw new Error(`An error occurred compiling the ${this._name} shader: ${this._gl.getShaderInfoLog(shader)}`);
            }
            return shader;
        }

        private makeProgram(vertexShader:WebGLShader, fragmentShader:WebGLShader):void {
            this._program = this._gl.createProgram(); 
            this._gl.attachShader(this._program, vertexShader);
            this._gl.attachShader(this._program, fragmentShader);
            this._gl.linkProgram(this._program);
        }

    }
}