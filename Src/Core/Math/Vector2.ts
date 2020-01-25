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
        public static dotProduct(v1:Vector2, v2:Vector2):number {
            return v1.x*v2.x+v1.y*v2.y;
        }
        public static crossProduct(v1:Vector2, v2:Vector2):number {
            return v1.x*v2.y-v1.y*v2.x;
        }
        public toArray() {
            return [this.x, this.y];
        }
       
        public add(vector:Vector2):Vector2 {
            this.x += vector.x;
            this.y += vector.y;
            return this;
        }
        public subtract(vector:Vector2):Vector2 {
            this.x -= vector.x;
            this.y -= vector.y;
            return this;
        }
        public multiply(vector:Vector2):Vector2 {
            this.x *= vector.x;
            this.y *= vector.y;
            return this;
        }
        public divide(vector:Vector2):Vector2 {
            this.x /= vector.x;
            this.y /= vector.y;
            return this;
        }
        public set(x:number, y:number) {
            this.x = x;
            this.y = y;
        }
        public scalarMultiply(scalar:number):Vector2 {
            this.x *= scalar;
            this.y *= scalar;
            return this;
           
        }
        public inverse():void {
            this.x *= -1;
            this.y *= -1;
        }
        public rotate(ang:number) {
            let x = this.x*Math.cos(ang) - this.y*Math.sin(ang);
            let y = this.x*Math.sin(ang) + this.y*Math.cos(ang);   
            this.x = x;
            this.y = y;
        }
        public magnitude():number {
            
            return  Math.sqrt(Math.pow((this.x), 2)+Math.pow((this.y), 2));
        }
        public magSquare():number {
            return Math.pow((this.x), 2)+Math.pow((this.y), 2);
        }
        public dotProduct(vec:Vector2):number {
            return this.x*vec.x+this.y*vec.y;
        }
        public crossProduct(vec:Vector2):number {
            return this.x*vec.y-this.y*vec.x;
        }
        public normalize():Vector2 {
            let magnitude = this.magnitude();
            if(magnitude===0) {
                return this;
            }
            this.x = this.x/magnitude;
            this.y = this.y/magnitude;
            return this;
        }
        public clone():Vector2 {
            return new Vector2(this.x, this.y);
        }
    }
}