/// <reference path="Material.ts"/>
namespace VERVE {

    export class BasicMaterial extends Material{
        
        private _color:string
        constructor(color:string) {
            super();
            this._color = color;
        }
        public loadUniform(gl: WebGLRenderingContext, shader: Shader): void {
            let colorLocation = shader.getUniformLocation("u_color");
            gl.uniform4f(colorLocation, 1, 1, 0, 1);
        }
    }
}