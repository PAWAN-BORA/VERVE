namespace VERVE {

    export class Vector2 {
        public x:number;
        public y:number;

        constructor(x=0, y=0){
            this.x = x;
            this.y = y;
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
        public set(x:number, y:number) {
            this.x = x;
            this.y = y;
        }
        public scalarMultiply(scalar:number):Vector2 {
            
            return new Vector2(this.x*scalar, this.y*scalar)
        }
        public magnitude():number {
            return  Math.sqrt(Math.pow((this.x), 2)+Math.pow((this.y), 2));
        }
    }
}