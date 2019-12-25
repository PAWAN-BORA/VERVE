namespace VERVE {

    export class EllipseGeometry extends Geometry{

        constructor(r1:number, r2:number, segments:number) {
            super();    
            this.setData(r1, r2, segments)
        }
        private setData(r1:number, r2:number, segments:number):void {
            let angle = 2*Math.PI/segments;
            let data = [];
            data.push(0, 0); 
            for(let i=0; i<segments; i++) {
                let x = r1*Math.cos(angle*i);
                let y = r2*Math.sin(angle*i);
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