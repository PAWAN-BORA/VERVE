namespace VERVE {

    export abstract class AudioLoader {
        public static sounds:{[name:string]:Sound} = {};
        constructor() {

        }
        public static load(path:string, name:string, fun:Function=()=>{}):void {
            let audio = new Audio();
            audio.onloadeddata = ()=>{
                AudioLoader.sounds[name] = new Sound(audio);
                fun();
            }
            audio.src = path;
        }
    } 
}