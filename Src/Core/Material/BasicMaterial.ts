/// <reference path="Material.ts"/>
namespace VERVE {

    export class BasicMaterial extends Material{
        
        private _color: Color;
        // public get color(): Color {
        //     return this._color;
        // }
        public set color(value:string) {

            this._color = Color.getColor(value);
        }
        constructor(color:string) {
            super();
            this._color = Color.getColor(color);
        }
        public loadUniform(gl: WebGLRenderingContext, shader: Shader): void {
            let colorLocation = shader.getUniformLocation("u_color");
            gl.uniform4fv(colorLocation, this._color.toFloatArray());
        }
    }
}