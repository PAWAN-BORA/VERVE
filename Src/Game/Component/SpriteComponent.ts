namespace VERVE {
    
    export class SpriteComponent {
        private _geometry:Geometry;
        private _material:Material;
        private _sprite:Sprite;
        constructor(geometry:Geometry, material:Material) {
            this._geometry = geometry;
            this._material = material;
            this._sprite = new Sprite(this._geometry, this._material);
            
        }

        public update():void {

        }
        public render():void {
            // this._sprite.load()
            this._sprite.draw();
        }
    }
}