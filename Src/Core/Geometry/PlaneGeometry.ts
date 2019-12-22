/// <reference path="Geometry.ts"/>
namespace VERVE {

    export class PlaneGeometry extends Geometry{
        constructor(width:number, height:number) {
            super();
            this._data = [
                // x,       y
                0,          0,
                width,      0,
                width,      height,
                0,          height
            ]
            this._indices = [
                0, 1, 2,
                2, 3, 0,
            ]
        }

        
    }
}