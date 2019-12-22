namespace VERVE {

    export class Geometry {
        protected _data: number[] = [];
        public get data(): number[] {
            return this._data;
        }
        // protected set data(value: number[]) {
        //     this._data = value;
        // }
        protected _indices: number[] = [];
        public get indices(): number[] {
            return this._indices;
        }
        // protected set indices(value: number[]) {
        //     this._indices = value;
        // }
        protected _vertices:Vector2[] = [];
        constructor() {

        }
        protected makeData():void {
            this._data = [];
            for(let v of this._vertices) {
                this._data.push(v.x, v.y);
            }

        }

    }
}