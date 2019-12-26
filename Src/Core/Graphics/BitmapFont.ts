namespace VERVE {

    function getNumber(field:string):number {
        return Number(field.split("=")[1]);
    }
    export class FontGlyph {
        private _id: number;
        public get id(): number {
            return this._id;
        }
        public set id(value: number) {
            this._id = value;
        }
        private _x:number;
        private _y:number;
        private _width:number;
        private _height:number;
        private _xOffset:number;
        private _yOffset:number;
        private _xAdvanced:number;
        constructor() {
            
        }
        public static getGlyphFromField(field:string[]):FontGlyph {
            let fontFlyph = new FontGlyph()
            fontFlyph._id = getNumber(field[1]);
            fontFlyph._x = getNumber(field[2]);
            fontFlyph._y = getNumber(field[3]);
            fontFlyph._width = getNumber(field[4]);
            fontFlyph._height = getNumber(field[5]);
            fontFlyph._xOffset = getNumber(field[6]);
            fontFlyph._yOffset = getNumber(field[7]);
            fontFlyph._xAdvanced = getNumber(field[8]);
            return fontFlyph;
        }
    }

    export class BitmapFont {
        private _fontImage:ImageBitmap; // will be rethink about this.
        private _fileName:string;
        private _glyphs:{[id:number]:FontGlyph} = {};
        constructor(content:string) {
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
            // console.log(lines)
            for(let line of lines) {
                let data = line.replace(/\s\s+/g, ' ');
                let fields = data.split(' ');
                // console.log(fields[0])
                switch (fields[0]) {
                    case "info":
                        
                        break;
                    case "common":
                        break;
                    case "chars":
                        charCount = getNumber(fields[1]);
                        // console.log(charCount);
                        break;
                    case "char":
                        let glyph = FontGlyph.getGlyphFromField(fields);

                        // this._glyphs.
                        this._glyphs[glyph.id] = glyph;
                        break;
                    default:
                        break;
                }
            }
            console.log(this._glyphs);
        }

    }
}