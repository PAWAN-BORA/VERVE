namespace VERVE {

    export class Ellispse {
        public position: Vector2;
        public rX:number;
        public rY:number;
        public rotation:number;
        public meterRadius:number;
        constructor(position:Vector2, rX:number, rY:number) {
            this.position = position;
            this.rX = rX;
            this.rY = rY;
            this.meterRadius = rX+rY/7.6;
        }
        public pointInShape(x: number, y: number): boolean {
            let leftEquation = (x-this.position.x)*Math.cos(this.rotation)+(y-this.position.y)*Math.sin(this.rotation);
            let rightEuqation = (x-this.position.x)*Math.sin(this.rotation)-(y-this.position.y)*Math.cos(this.rotation);
            let leftValue = Math.pow(leftEquation, 2)/Math.pow(this.rX, 2);
            let rightValue = Math.pow(rightEuqation, 2)/Math.pow(this.rY, 2);
            return leftValue+rightValue<=1;
        }
        // public intersect(shape: IShape): boolean {
            // if(shape instanceof Circle) {
            //     return this.intersectWithCircle(shape);
            // } if(shape instanceof Rectangle) {
               
            //     return this.intersectWithRectangle(shape);
            // }
        // }
        // public intersectWithCircle(shape:Circle):boolean {
            
            // let vec = new Vector2(shape.position.x, shape.position.y);
            // vec.subtract(this.position);
            // let dis = vec.magnitude();
            // if(dis<this.radius+shape.radius) {
            //     return true;
            // }
            // return false;
        // }
        // public intersectWithRectangle(rect:Rectangle):boolean {
            
            // return rect.intersectWithCircle(this);
        // }
    }
}