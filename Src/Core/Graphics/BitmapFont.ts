namespace VERVE {

    function getNumber(field:string):number {
        return Number(field.split("=")[1]);
    }
    export class FontGlyph {
        public id: number;
        public x:number;
        public y:number;
        public width:number;
        public height:number;
        public xOffset:number;
        public yOffset:number;
        public xAdvanced:number;
        constructor() {
            
        }
        public static getGlyphFromField(field:string[]):FontGlyph {
            let fontFlyph = new FontGlyph()
            fontFlyph.id = getNumber(field[1]);
            fontFlyph.x = getNumber(field[2]);
            fontFlyph.y = getNumber(field[3]);
            fontFlyph.width = getNumber(field[4]);
            fontFlyph.height = getNumber(field[5]);
            fontFlyph.xOffset = getNumber(field[6]);
            fontFlyph.yOffset = getNumber(field[7]);
            fontFlyph.xAdvanced = getNumber(field[8]);
            return fontFlyph;
        }
    }

    export class BitmapFont {
        public fontImage:HTMLImageElement;
        private _path:string;
        private _width: number;
        private _name: string;
        public get name(): string {
            return this._name;
        }
        public set name(value: string) {
            this._name = value;
        }
        public get width(): number {
            return this._width;
        }
        // public set width(value: number) {
        //     this._width = value;
        // }
        private _height: number;
        public get height(): number {
            return this._height;
        }
        // public set height(value: number) {
        //     this._height = value;
        // }
        private loadFun:Function;
        private _glyphs:{[id:number]:FontGlyph} = {};
        constructor(content:string, path:string, fun?:Function) {
            this._path = path;
            this.loadFun = fun;
            this.prossesFontFile(content)
        }
        public getGlyph(char:string):FontGlyph {
            let code = char.charCodeAt(0);
            return this._glyphs[code];
        }
        public measureText():void {
            
        }
        private prossesFontFile(content:string):void {
            let charCount = 0;
            let lines = content.split('\n');
            for(let line of lines) {
                let data = line.replace(/\s\s+/g, ' ');
                let fields = data.split(' ');
                switch (fields[0]) {
                    case "info":
                        
                        break;
                    case "common":
                        this._width = getNumber(fields[3])
                        this._height = getNumber(fields[4])
                        break;
                    case "page": 
                        let str = this._path.split('/');
                        str.pop();
                        let path = str.join('/').concat('/', fields[2].split("=")[1].replace(/"/g, ""));
                        this.fontImage = new Image();
                        this.fontImage.src = path;
                        this.fontImage.onload = ()=>{
                            if(this.loadFun!==undefined) {
                                this.loadFun();
                            }
                        }
                    case "chars":
                        
                        charCount = getNumber(fields[1]);
                        break;
                    case "char":
                        let glyph = FontGlyph.getGlyphFromField(fields);

                        this._glyphs[glyph.id] = glyph;
                        break;
                    default:
                        break;
                }
            }
            // if(charCount)
            let num = 0;
            for(let glyph in this._glyphs) {
                if(this._glyphs.hasOwnProperty(glyph)) {
                    num++;
                }
            }
            if(charCount!==num) {
                throw new Error(`font file reported existence of ${charCount} glyph, but only ${num} were found.`)
            }
            
        }

    }
}