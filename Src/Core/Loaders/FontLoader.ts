namespace VERVE {

    export class FontLoader {
        public static bitmapFont:{[name:string]:BitmapFont} = {};
        public constructor() {

        }
        public static load(path:string, name:string, fun?:Function):void {
            let request = new XMLHttpRequest();
            request.onreadystatechange =  ()=> {
                if(request.readyState==4 && request.status===200) {
                    content = request.responseText;
                    let bitmapFont = new BitmapFont(content, path, fun);
                    bitmapFont.name = name;
                    FontLoader.bitmapFont[name] = bitmapFont;
                } 
            };
            request.open("GET", path);
            request.send();
        }

    }
}