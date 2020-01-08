namespace VERVE {

    export class Body {
        public shape:IShape;
        public restitution:number;
        private _mass: number;
        public type:"circle"|"rectangle" 
        public get mass(): number {
            
            return this._mass;
        }
        public set mass(value: number) {
            this._mass = 1/value;
            this._mass = value;
        }
        public inverseMass:number;
        constructor(shape:IShape, restitution:number, mass:number) {
            this.shape = shape;
            // this.type = type;
            this.restitution = restitution;
            if(restitution>1) {
                console.warn(`restitution should be between 0 and 1: ${restitution}->setting default 1`)
                this.restitution = 1;
            } else if(restitution<0) {
                console.warn(`restitution should be between 0 and 1: ${restitution}->setting default 1`)
                this.restitution = 0;
            }
            this._mass = mass;
            this.inverseMass = 1/mass;
        }
    }
}