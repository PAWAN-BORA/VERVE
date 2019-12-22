namespace VERVE {

    export class Vector3 {
        public x:number;
        public y:number;
        public z:number;

        constructor(x=0, y=0, z=0) {
            this.x =x;
            this.y = y;
            this.z = z;
        }
        public static one():Vector3 {
            
            let vec = new Vector3();
            vec.x = 1;
            vec.y  =1;
            vec.z = 1;
            return vec;
        }
        public Add(v:Vector3):Vector3 {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        }
    }
}