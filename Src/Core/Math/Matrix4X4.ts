namespace VERVE {

    export class Matrix4X4 {
        private _data:number[] = [];
        public get data() {
            return this._data;
        }
        constructor() {
            this._data = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ]
        }

        public static orthographic(left:number, right:number, bottom:number, top:number, near:number, far:number):Matrix4X4 {
            let mat = new Matrix4X4();
            let width = right - left;
            let height = bottom - top;
            let depth = far - near;
            mat._data[0] = 2.0/width;
            mat._data[5] = -2.0/height;
            mat._data[10] = -2.0/depth;
            mat._data[12] = -(right +left)/width;  // might be change
            mat._data[13] = (top+bottom)/height;
            mat._data[14] = (far+near)/depth;  // might be wrong

            return mat;
        }

        public static translation(position:Vector3):Matrix4X4 {
            let mat = new Matrix4X4();
            mat._data[12] = position.x;
            mat._data[13] = position.y;
            mat._data[14] = position.z;
            return mat;
        }
        public static rotationZ(angle:number):Matrix4X4 {
            let mat = new Matrix4X4();
            let c = Math.cos(angle);
            let s = Math.sin(angle);
            mat._data[0] = c;
            mat._data[1] = s;
            mat._data[4] = -s;
            mat._data[5] = c;

            return mat;
        }

        public static scale(scale:Vector3):Matrix4X4 {
            let mat = new Matrix4X4();
            mat._data[0] = scale.x;
            mat._data[5] = scale.y;
            mat._data[10] = scale.z;
            return mat;
        }

        public static multiply(a:Matrix4X4, b:Matrix4X4):Matrix4X4 {
            let mat = new Matrix4X4();
            
            let a11 = a._data[0], a12 = a._data[4], a13 = a._data[8], a14 = a._data[12];
            let a21 = a._data[1], a22 = a._data[5], a23 = a._data[9], a24 = a._data[13];
            let a31 = a._data[2], a32 = a._data[6], a33 = a._data[10], a34 = a._data[14];
            let a41 = a._data[3], a42 = a._data[7], a43 = a._data[11], a44 = a._data[15];
            
            let b11 = b._data[0], b12 = b._data[4], b13 = b._data[8], b14 = b._data[12];
            let b21 = b._data[1], b22 = b._data[5], b23 = b._data[9], b24 = b._data[13];
            let b31 = b._data[2], b32 = b._data[6], b33 = b._data[10], b34 = b._data[14];
            let b41 = b._data[3], b42 = b._data[7], b43 = b._data[11], b44 = b._data[15];

            mat._data[0]    = a11*b11 + a12*b21 + a13*b31 + a14*b41;
            mat._data[4]    = a11*b12 + a12*b22 + a13*b32 + a14*b42;
            mat._data[8]    = a11*b13 + a12*b23 + a13*b33 + a14*b43;
            mat._data[12]   = a11*b14 + a12*b24 + a13*b34 + a14*b44;

            mat._data[1]    = a21*b11 + a22*b21 + a23*b31 + a24*b41;
            mat._data[5]    = a21*b12 + a22*b22 + a23*b32 + a24*b42;
            mat._data[9]    = a21*b13 + a22*b23 + a23*b33 + a24*b43;
            mat._data[13]   = a21*b14 + a22*b24 + a23*b34 + a24*b44;

            mat._data[2]    = a31*b11 + a32*b21 + a33*b31 + a34*b41;
            mat._data[6]    = a31*b12 + a32*b22 + a33*b32 + a34*b42;
            mat._data[10]   = a31*b13 + a32*b23 + a33*b33 + a34*b43;
            mat._data[14]   = a31*b14 + a32*b24 + a33*b34 + a34*b44;
            
            mat._data[3]    = a41*b11 + a42*b21 + a43*b31 + a44*b41;
            mat._data[7]    = a41*b12 + a42*b22 + a43*b32 + a44*b42;
            mat._data[11]   = a41*b13 + a42*b23 + a43*b33 + a44*b43;
            mat._data[15]   = a41*b14 + a42*b24 + a43*b34 + a44*b44;
            
            return mat;
        }
        public static inverse(matrix:Matrix4X4) {
            

        }
    }
}