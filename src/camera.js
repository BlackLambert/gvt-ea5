class Camera
{

    constructor(position, rotation, fieldOfView, minFieldOfView, maxFieldOfView, near, far)
    {
        this.position = position;
        this.rotation = rotation;
        this.fieldOfView = fieldOfView;
        this.minFieldOfView = minFieldOfView;
        this.maxFieldOfView = maxFieldOfView;
        this.near = near;
        this.far = far;
    }

    
    setFieldOfView(value)
    {
        this.fieldOfView = clamp(value, this.minFieldOfView, this.maxFieldOfView);
    }

    static createOrthographic()
    {
        return new Camera([0,0,0], [0,0,0], 60, 10, 175, 400, -400);
    }

    static createPerspective()
    {
        return new Camera([0,0,0], [0,0,0], 60, 10, 175, 1, 2000);
    }

    get viewMatrix()
    {
        let matrix = Matrix.createUnitMatrix(4);
        matrix = matrix.multiply(Matrix.createTranslationMatrix(this.position));
        //console.log(matrix);
        matrix = matrix.multiply(Matrix.createRotationMatrixXYZ(this.rotation));
        //console.log(matrix);
        matrix = matrix.inverse();
        //console.log(matrix);
        return matrix;
    }

    rotateAroundCenterY(angle, distance)
    {
        assert(typeof angle === "number" &&typeof distance === "number", 
            [angle, distance], 
            "Invalid distance or angle")

        
        this.rotation = [0, angle, 0];
        let matrix = Matrix.createUnitMatrix(4);
        matrix = matrix.multiply(Matrix.createTranslationMatrix([0,0,distance]));
        matrix = matrix.multiply(Matrix.createRotationMatrix(angle, 1, 4));
        let newPos = matrix.multiply(new Matrix([1, 1, 1, 1], 1, 4)).elements;
        //console.log(newPos);
        this.position = [newPos[0],newPos[1],newPos[2]];
    }
}