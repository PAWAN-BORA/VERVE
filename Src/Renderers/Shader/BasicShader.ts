/// <reference path="Shader.ts"/>

namespace VERVE {

    export class BasicShader extends Shader {
        constructor(gl:WebGLRenderingContext) {
            super("Basic", gl);
            this.laod(this._vertexSource, this._fragmentSource);
        }

        private _vertexSource = `
        attribute vec3 v_coordinate; 
        void main() {
            gl_Position = vec4(v_coordinate, 1.0);
        }
        `
        private _fragmentSource = `
        precision mediump float;

        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
        `
    }
}