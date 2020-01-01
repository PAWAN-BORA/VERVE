namespace VERVE {

    export class Color {
        private _r:number;
        private _g:number;
        private _b:number;
        private _a:number;
        constructor(r:number=0, g:number=0, b:number=0, a:number=255) {
            this._r = r;
            this._g = g;
            this._b = b;
            this._a = a;
        }
        public toFloatArray():Array<number> {
            return [this._r/255, this._g/255, this._b/255, this._a/255];
        }
        public static getColor(color:string):Color {
            let r:number, g:number, b:number, a:number=255;
            if(color.charAt(0)==="#") {
                let value = color.split("#")[1];
                r = parseInt(value.substring(0, 2), 16);
                g = parseInt(value.substring(2, 4), 16);
                b = parseInt(value.substring(4, 6), 16);
                return new Color(r, g, b);
            } else if(color.substring(0, 4)==="rgba") {
                let value = color.split("rgba")[1].slice(1, -1);
                let colors = value.split(",");
                r = parseInt(colors[0]);
                if(isNaN(r)) {
                    throw new Error(`wrong rgba format: red value is not defined`);
                }
                g = parseInt(colors[1]);
                if(isNaN(g)) {
                    throw new Error(`wrong rgba format: green value is not defined`);
                }
                b = parseInt(colors[2]);
                if(isNaN(b)) {
                    throw new Error(`wrong rgba format: blue value is not defined`);
                }
                a = parseInt(colors[3]);
                if(isNaN(a)) {
                    throw new Error(`wrong rgba format: alpah value is not defined`);
                }
                return new Color(r, g, b, a);
            } else if(color.substring(0, 3)==="rgb") {
                let value = color.split("rgb")[1].slice(1, -1);
                let colors = value.split(",");
                r = parseInt(colors[0]);
                if(isNaN(r)) {
                    throw new Error(`wrong rgba format: red value is not defined`);
                }
                g = parseInt(colors[1]);
                if(isNaN(g)) {
                    throw new Error(`wrong rgba format: green value is not defined`);
                }
                b = parseInt(colors[2]);
                if(isNaN(b)) {
                    throw new Error(`wrong rgba format: blue value is not defined`);
                }
                return new Color(r, g, b);
            }
            console.error(`color format "${color}" is incorrect.`)
            return undefined;
        }
    }
}