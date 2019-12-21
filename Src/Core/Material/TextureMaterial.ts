/// <reference path="Material.ts"/>
namespace VERVE {

    export class TextureMaterial extends Material{
        private _texture:Texture;
        constructor(texture:Texture) {
            super();
            this._texture = texture;
        }
    }
}