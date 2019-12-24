/// <reference path="Shader.ts"/>

namespace VERVE {

    export class BasicShader extends Shader {
        constructor(gl:WebGLRenderingContext) {
            super("Basic", gl);
            this.laod(this._vertexSource, this._fragmentSource);
        }

        private _vertexSource = `
        attribute vec2 a_coordinate;
        attribute vec2 a_textureCoord;
        varying vec2 v_textureColor;
        uniform float u_zCoord;
        uniform mat4 u_projectionView;
        uniform mat4 u_model;
        void main() {
            v_textureColor = a_textureCoord;
            gl_Position = u_projectionView*u_model*vec4(a_coordinate, u_zCoord, 1.0);
        }
        `
        private _fragmentSource = `
        precision mediump float;
        varying vec2 v_textureColor;
        uniform sampler2D sampler;
        uniform vec4 u_color;
        void main() {
            //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            // vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
            gl_FragColor = texture2D(sampler, v_textureColor)*u_color;
            // gl_FragColor = color*u_color;
            // gl_FragColor.rgb *= gl_FragColor.a;
        }
        `
    }
}