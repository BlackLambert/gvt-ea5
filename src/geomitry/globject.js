// Copyright: Sebastian Baier (sebastian.baier93@hotmail.de) 2020

class GLObject
{
    constructor(localPosition, localRotation, localScale, vertices, faces, wireframe)
    {
        this.localPosition = localPosition;
        this.localRotation = localRotation;
        this.localScale = localScale;
        this.vertices = vertices;
        this.faces = faces;
        this.wireframe = wireframe;
        this.setFaceColor(Color.black())
        this.setWireframeColor(Color.black())
    }

    get verticePositions()
    {
        let result = [];
        for(let i = 0; i < this.vertices.length; i++)
        {
            let vP = this.vertices[i].localPosition;
            result.push(vP[0]);
            result.push(vP[1]);
            result.push(vP[2]);
        }
        //console.log(result);
        return result;
    }

    get translationMatrix()
    {
        return Matrix.createTranslationMatrix(this.localPosition);
    }

    get rotationMatrixX()
    {
        return Matrix.createRotationMatrix(this.localRotation[0], 0, 4);
    }

    get rotationMatrixY()
    {
        return Matrix.createRotationMatrix(this.localRotation[1], 1, 4);
    }

    get rotationMatrixZ()
    {
        return Matrix.createRotationMatrix(this.localRotation[2], 2, 4);
    }

    get rotationMatrix()
    {
        return Matrix.createRotationMatrixXYZ(this.localRotation);
    }

    get scaleMatrix()
    {
        return Matrix.createScaleMatrix(this.localScale);
    }

    transformationMatrix()
    {
        let result = Matrix.createUnitMatrix(4);
        result = result.multiply(this.scaleMatrix);
        result = result.multiply(this.rotationMatrix);
        result = result.multiply(this.translationMatrix);
        
        //console.log(zToWMatrix);
        //console.table([zToWMatrix.elements, projectionMatrix.elements, this.translationMatrix.elements, this.rotationMatrix.elements, this.scaleMatrix.elements, result.elements]);
        //console.log(result.multiply(new Matrix([50,50,50,1], 1, 4)));
        return result;
    }

    faceIndices(indexOffset)
    {
        return this.faces.reduce((r, f) => r = r.concat(f.getIndices(indexOffset)),[]);
    }

    wireframeIndices(indexOffset)
    {
        return this.wireframe.reduce((r, l) => r = r.concat(l.getIndices(indexOffset)),[]);
    }

    get faceColorValues()
    {
        return this.faceColors.reduce((r, c) => r = r.concat(c.toArray()),[]);
    }

    get wireframeColorValues()
    {
        return this.wireframeColors.reduce((r, c) => r = r.concat(c.toArray()), []);
    }

    setFaceColor(color)
    {
        this.faceColors = this.createColorsArrayOf(color);
    }

    setSingleFaceColor(index, color)
    {
        this.faceColors[index] = color;
    }

    setWireframeColor(color)
    {
        this.wireframeColors = this.createColorsArrayOf(color);
    }

    setSingleWireframeColor(index, color)
    {
        this.wireframeColors[index] = color;
    }

    createColorsArrayOf(color)
    {
        let colors = [];
        for(let i = 0; i < this.vertices.length; i++)
        {
            colors.push(color);
        }
        return colors;
    }
}