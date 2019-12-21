/// <reference path="Material.ts"/>
namespace VERVE {

    export class BasicMaterial extends Material{
        private _color:string
        constructor(color:string) {
            super();
            this._color = color;
        }
    }
}