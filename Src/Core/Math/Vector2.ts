namespace VERVE {

    export class Vector2 {
        public x:number;
        public y:number;

        constructor(x=0, y=0){
            this.x = x;
            this.y = y;
        }
        public static add(v1:Vector2, v2:Vector2):Vector2 {
            let vec = new Vector2();
            vec.x = v1.x + v2.x;
            vec.y = v1.y + v2.y;
            return vec;
        } 
        public static subtract(v1:Vector2, v2:Vector2):Vector2 {
            let vec = new Vector2();
            vec.x = v1.x - v2.x;
            vec.y = v1.y - v2.y;
            return vec;
        }
        public toArray() {
            return [this.x, this.y];
        }
        public add(vector:Vector2):void {
            this.x += vector.x;
            this.y += vector.y;
        }
        public subtract(vector:Vector2):void {
            this.x -= vector.x;
            this.y -= vector.y;
        }
        public multiply(vector:Vector2):void {
            this.x *= vector.x;
            this.y *= vector.y;
        }
        public set(x:number, y:number) {
            this.x = x;
            this.y = y;
        }
        public scalarMultiply(scalar:number):Vector2 {
            
            return new Vector2(this.x*scalar, this.y*scalar) // might be change latter;
        }
        public magnitude():number {
            return  Math.sqrt(Math.pow((this.x), 2)+Math.pow((this.y), 2));
        }
        public dotProduct(vec:Vector2):number {
            return this.x*vec.x+this.y*vec.y;
        }
        public normalize():void {
            let magnitude = this.magnitude();
            this.x = this.x/magnitude;
            this.y = this.y/magnitude;
        }
    }
}