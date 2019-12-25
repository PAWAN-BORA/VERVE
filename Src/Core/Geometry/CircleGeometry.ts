/// <reference path="Geometry.ts"/>
namespace VERVE {

    export class CircleGeometry extends Geometry{
        constructor(radius:number, segments:number) {
            super();
            this.setData(radius, segments);
        }
        private setData(radius:number, segments:number):void {
            let angle = 2*Math.PI/segments;
            let data = [];
            data.push(0, 0); 
            for(let i=0; i<segments; i++) {
                let x = radius*Math.cos(angle*i);
                let y = radius*Math.sin(angle*i);
                data.push(x, y);
            }
            this._data = data;
            let indices = [];
            for(let i=0; i<segments; i++) {
                let t1=0, t2=i+1, t3:number;
                if(i===segments-1) {
                    t3 = 1;
                } else {
                    t3=i+2
                }
                indices.push(t1, t2, t3);
            }
            this._indices= indices;
           
        }
    }
}