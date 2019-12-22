namespace VERVE {

    export class Camera {
        public projection:Matrix4X4;
      
        constructor(left:number, right:number, bottom:number, top:number) {
            this.projection = Matrix4X4.orthographic(left, right, bottom, top, 0, 100);
        }
        
    }
}