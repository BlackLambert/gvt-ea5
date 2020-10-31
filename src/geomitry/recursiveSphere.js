// Copyright: Sebastian Baier (sebastian.baier93@hotmail.de) 2020

class RecursiveSphere extends GLObject
{
    constructor(radius, recursions, localPosition, localRotation, localScale, vertices, faces, wireframe)
    {
        super(localPosition, localRotation, localScale, vertices, faces, wireframe);
        this.maxRecursion = 5;
        this.minRecursion = 1;
        this.radius = radius;
        this.recursions = recursions;
    }

    static createBasic(radius, recursions, lineColor, faceColor)
    {
        assert(typeof radius === "number" && 
            radius > 0 &&
            typeof recursions === "number" && 
            recursions > 0 && 
            recursions < 20,
            [radius, recursions, lineColor, faceColor],
            "Invalid arguments");
        
        let result = new RecursiveSphere(
            radius, 
            recursions, 
            new Vector3(0,0,0),
            [0,0,0], 
            [1,1,1],
            [],
            [], 
            []);
        result.updateMesh();
        result.setFaceColor(faceColor);
        result.setWireframeColor(lineColor);
        console.log(result);
        return result;
    }

    updateMesh()
    {
        let sphere = this;
        let rec = Math.ceil(this.recursions);
        let baseObject = Octahedron.createBasic(this.radius*2, this.radius*2, Color.black(), Color.white());
        let result = subdivide(baseObject, 1);
        result.removeDoubleLines();
        sphere.vertices = result.vertices;
        sphere.faces = result.faces;
        sphere.wireframe = result.wireframe;


        function subdivide(glObject, currentRecursion)
        {
            //console.log(glObject);
            if(currentRecursion >= rec)
            {
                return glObject;
            }

            let v = glObject.vertices;
            let idToVertex = {};

            // Creates subdivision vertices (one per line)
            glObject.wireframe.forEach(line => {
                let v1 = line.vertices[0];
                let v2 = line.vertices[1];
                let p1 = v1.localPosition;
                let p2 = v2.localPosition;
                let pos = p2.subtract(p1);
                //console.table(pos.elements);
                pos = pos.multiply(0.5);
                //console.table(pos.elements);
                pos = p1.add(pos);
                //console.log(pos.x);

                let vertex = new Vertex(new Vector3(pos.x, pos.y, pos.z), v.length);
                v.push(vertex);
                idToVertex["" + v1.index + v2.index] = vertex;
                idToVertex["" + v2.index + v1.index] = vertex;
            });

            // Repositions vertices
            v.forEach(vertex => {
                let p = vertex.localPosition;
                let normalized = p.normalized();
                //console.log(normalized.magnitude());
                vertex.localPosition = normalized.multiply(sphere.radius);
            });

            let triangulation = Triangulation.createEmpty();

            // Creates lines and faces
            glObject.faces.forEach(face => {
                let v1 = face.vertices[0];
                let v2 = face.vertices[1];
                let v3 = face.vertices[2];
                let v12 = idToVertex["" + v1.index + v2.index];
                let v23 = idToVertex["" + v2.index + v3.index];
                let v31 = idToVertex["" + v3.index + v1.index];
                triangulation.combine(Triangulation.triangulateThree([v1,v12,v31]));
                triangulation.combine(Triangulation.triangulateThree([v12,v2,v23]));
                triangulation.combine(Triangulation.triangulateThree([v31,v23,v3]));
                triangulation.combine(Triangulation.triangulateThree([v12,v23,v31]));
            });

            let result = new RecursiveSphere(
                sphere.radius, 
                sphere.recursions, 
                glObject.localPosition, 
                glObject.localRotation, 
                glObject.localScale,
                v,
                triangulation.faces, 
                triangulation.lines);
            result.removeDoubleLines();
            return subdivide(result, currentRecursion + 1);
        }
    }
    
    setRecursions(value)
    {
        this.recursions = clamp(value, this.minRecursion, this.maxRecursion);
    }
}