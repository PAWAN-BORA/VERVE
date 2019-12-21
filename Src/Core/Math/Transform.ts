namespace VERVE {
    
    export class Transform {
        public position:Vector3;
        public rotation:Vector3;
        public scale:Vector3;


        constructor(position=new Vector3, rotation=new Vector3(), scale = Vector3.one()) {
            this.position = position;
            this.rotation = rotation;
            this.scale = scale;
        }

        public getTranformationMatrix():Matrix4X4 {
            let trasnlate = Matrix4X4.translation(this.position);
            let rotate = Matrix4X4.rotationZ(this.rotation.z);  
            let scale = Matrix4X4.scale(this.scale);

            // T * R * S
            return Matrix4X4.multiply(Matrix4X4.multiply(trasnlate, rotate), scale);
        }
    }
}