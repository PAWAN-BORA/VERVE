/// <reference path="Material.ts"/>
namespace VERVE {

    export class TextureMaterial extends Material{
       
        
        private _image:HTMLImageElement;
        constructor(image:HTMLImageElement) {
            super();
            this._image = image;
            // this._texture = new Texture();
        }
        public loadTexture():void {
            this._texture.load(this._image);
        }
        public changeTexture(image:HTMLImageElement):void {
            this._image = image;
            this.loadTexture();
        }
        public loadUniform(gl:WebGLRenderingContext, shader:Shader): void {
            let colorLocation = shader.getUniformLocation("u_color");
            // console.log(this._color)
            gl.uniform4fv(colorLocation, new Float32Array(this._color.toFloatArray()));
        }
        
    }
}