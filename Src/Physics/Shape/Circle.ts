namespace VERVE {

    export class Circle implements IShape{
        public position: Vector2;
        public radius:number;
        public rotation:number;
        public meterRadius:number;
       
        constructor(position:Vector2, radius:number) {
            this.position = position;
            this.radius = radius;
            this.meterRadius = radius/3.8;
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
            } if(shape instanceof Rectangle) {
               
                return this.intersectWithRectangle(shape);
            }
        }
        public intersectWithCircle(shape:Circle):boolean {
            
            let vec = new Vector2(shape.position.x, shape.position.y);
            vec.subtract(this.position);
            let dis = vec.magnitude();
            if(dis<this.radius+shape.radius) {
                return true;
            }
            return false;
        }
        public intersectWithRectangle(rect:Rectangle):boolean {
            
            return rect.intersectWithCircle(this);
        }

        // degub code 
        private _shapeComponent:ShapeComponent;
        public load(gl:WebGL2RenderingContext):void {
            let material = new BasicMaterial("#000000");
            let geometry= new CircleGeometry(this.radius, 20);
            this._shapeComponent = new ShapeComponent(geometry, material);
            this._shapeComponent.load(gl);
            this._shapeComponent.update(0); 
        }
        public render(render:Renderer):void {
            this._shapeComponent.x = this.position.x;
            this._shapeComponent.y = this.position.y;
            this._shapeComponent.update(10); 
            this._shapeComponent.render(render);
        }
    }
}