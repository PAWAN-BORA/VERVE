namespace VERVE {

    export class Body {
        shape:IShape;
        restitution:number;
        mass:number;
        constructor(shape:IShape, restitution:number, mass:number) {
            this.shape = shape;
            this.restitution = restitution;
            this.mass = mass;
        }
    }
}