interface BodyType {
    type:"circle"|"rectangle";
}

namespace VERVE {

    export class Body {
        public shape:IShape;
        public restitution:number;
        private _mass: number;
        public type:BodyType["type"];
        public offset:Vector2; 
        private _inertia: number;
        public get inertia(): number {
            return this._inertia;
        }
        public set inertia(value: number) {
            if(value===undefined) {
                this.inverseInertia = 0;
                this._inertia = value;
            } else {
                this.inverseInertia = Math.round((1/value)*100000)/100000;
                this._inertia = value;
            }
        }
        public get mass(): number {
            
            return this._mass;
        }
        public set mass(value: number) {
            if(value == undefined) {
                this.inverseMass = 0;
                this._mass = value;
            } else {
                this.inverseMass = Math.round((1/value)*100000)/100000;
                this._mass = value;

            }
        }
        public inverseMass:number;
        public inverseInertia:number;
        public density:number;
        constructor(type:BodyType["type"], {restitution=undefined, density=undefined}:{restitution:number, density:number}) {
            this.type = type;
            this.offset = new Vector2();
            this.restitution = restitution;
            if(restitution>1) {
                console.warn(`restitution should be between 0 and 1: ${restitution}->setting default 1`)
                this.restitution = 1;
            } else if(restitution<0) {
                console.warn(`restitution should be between 0 and 1: ${restitution}->setting default 1`)
                this.restitution = 0;
            }
            this.density = density;
        }
    }
}