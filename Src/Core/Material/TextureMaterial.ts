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
        public loadUniform(gl:WebGLRenderingContext, shader:Shader): void {
            let colorLocation = shader.getUniformLocation("u_color");
            gl.uniform4f(colorLocation, 1, 1, 1, 1);
        }
    }
}