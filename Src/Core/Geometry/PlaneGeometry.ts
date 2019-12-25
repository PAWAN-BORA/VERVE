/// <reference path="Geometry.ts"/>
namespace VERVE {

    export class PlaneGeometry extends Geometry{
        constructor(width:number, height:number) {
            super();
            this._data = [
                // x,           y
                -width/2,    -height/2,
                 width/2,    -height/2,
                 width/2,     height/2,
                -width/2,     height/2
            ]
            this._indices = [
                0, 1, 2,
                2, 3, 0,
            ]
        }

        
    }
}