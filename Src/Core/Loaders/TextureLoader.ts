namespace VERVE {

    export abstract class TextureLoader {
        public static image:{[name:string]:HTMLImageElement} = {};
        constructor() {
           
        }
        public static load(path:string, name:string, fun:Function=()=>{}):void {
           let image = new Image();
           image.onload = ()=>{
                TextureLoader.image[name] = image;
                fun();
            }
            image.onerror = ()=>{
                throw new Error('Error in loading image: '+name);
            }
            image.src = path;
        }
    }
}