namespace VERVE {

    export class Sound {
        private _audio:HTMLAudioElement
        constructor(audio:HTMLAudioElement) {
            this._audio = audio;
        }
        public play() {
            this.stop();
            this._audio.play();
        }
        public stop() {
            this.pause();
            this._audio.currentTime = 0;
        }
        public pause() {
            this._audio.pause();
        }
    }
}