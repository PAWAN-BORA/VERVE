namespace VERVE {

    export class Circle implements IShape{
        public position: Vector2;
        public radius:number;
        
        constructor(position:Vector2, radius:number) {
            this.position = position;
            this.radius = radius;
        }
        public pointInShape(x: number, y: number): boolean {
            let dis = Math.sqrt(Math.pow((this.position.x-x), 2)+Math.pow((this.position.y-y), 2));
            let vec = new Vector2(x, y);
            vec.subtract(this.position);
            dis = vec.magnitude();
            if(dis<this.radius) {
                return true;
            }
            return false;
        }
        public intersect(shape: IShape): boolean {
            if(shape instanceof Circle) {
                return this.intersectWithCircle(shape);
            }
        }
        private intersectWithCircle(shape:Circle):boolean {
            
            let vec = new Vector2(shape.position.x, shape.position.y);
            vec.subtract(this.position);
            let dis = vec.magnitude();
            if(dis<this.radius+shape.radius) {
                return true;
            }
            return false;
        }

    }
}