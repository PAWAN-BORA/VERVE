namespace VERVE {

    export class Shader {
        private _name:string;
        private _program:WebGLProgram;
        private _gl:WebGLRenderingContext;
        private _attributes:{[name:string]:number} = {};
        private _uniforms:{[name:string]:WebGLUniformLocation} = {};

        constructor(name:string, gl:WebGLRenderingContext) {
            this._name = name;
            this._gl = gl;
        }
        public getAttributeLocation(name:string):number {
            if(this._attributes[name]==undefined) {
                throw new Error(`attribute ${name} dose not exist in the shader ${this._name}`);
            }
            return this._attributes[name];
        }
        public getUniformLocation(name:string):WebGLUniformLocation {
            if(this._uniforms[name]==undefined) {
                throw new Error(`unfiorm ${name} dose not exist in the shader ${this._name}`);
            }
            return this._uniforms[name];
        }
        protected laod(vertexSource:string, fragmentSource:string){
            let vertexShader = this.loadShader(vertexSource, this._gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, this._gl.FRAGMENT_SHADER);
            this.makeProgram(vertexShader, fragmentShader);
            this.detectedAttributes();
            this.detectedUniforms();
            
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

        private detectedAttributes():void {
            let totalAttributes = this._gl.getProgramParameter(this._program, this._gl.ACTIVE_ATTRIBUTES);
            for(let i=0; i<totalAttributes; i++) {
                let attribute  = this._gl.getActiveAttrib(this._program, i);
                if(attribute ==undefined) {
                    console.log("breaking the system attribute")
                    break;
                }
                this._attributes[attribute.name] = this._gl.getAttribLocation(this._program, attribute.name);
            }

        }
        private detectedUniforms():void {
            let totalUniforms = this._gl.getProgramParameter(this._program, this._gl.ACTIVE_UNIFORMS);
            for(let i=0; i<totalUniforms; i++) {
                let uniform  = this._gl.getActiveUniform(this._program, i);
                if(uniform ==undefined) {
                    console.log("breaking the system uniform")
                    break;
                }
                this._uniforms[uniform.name] = this._gl.getUniformLocation(this._program, uniform.name);
            }
        }

    }
}