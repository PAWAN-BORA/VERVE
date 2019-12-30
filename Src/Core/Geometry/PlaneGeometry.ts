/// <reference path="Geometry.ts"/>
namespace VERVE {

    export class PlaneGeometry extends Geometry{
        public origin:Vector2 = new Vector2();
        constructor(width:number, height:number) {
            super();
            this._data = [
                // x,           y
                -width/2,    -height/2,
                 width/2,    -height/2,
                 width/2,     height/2,
                -width/2,     height/2
            ];
            // this._data = [
            //     // x,       y
            //     0,         0,
            //     width,     0,
            //     width,     height,
            //     0,         height
            // ];
            this._indices = [
                0, 1, 2,
                2, 3, 0,
            ]
        }
        public setOrigin():void {

        }
        
    }
}