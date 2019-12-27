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
        private _fontImage:HTMLImageElement;
        private _fileName:string;
        private _width: number;
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
                        this._width = getNumber(fields[3])
                        this._height = getNumber(fields[4])
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