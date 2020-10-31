let gl;

// Scene
let scene;
let renderer;

let glPositionAttributeLocation = null;
let glColorAttributeLocation = null;
let glMatrixLocation = null;

let vertexBuffer = null;
let lineIndicesBuffer = null
let triangleColorBuffer = null;
let lineColorBuffer = null;
let triangleIndicesBuffer = null;

function webglMain()
{
    renderer = new Renderer();
    gl = renderer.gl;
    scene = createScene();
}

function createScene()
{
    // ------------------------------------------
    // Creates meshes 
    // ------------------------------------------

    const cuboidDimensions = [200, 100, 150];
    const cuboidPosition = new Vector3(0, -100, -50);
    const cuboidRotation = [30, 45, 125];
    const cuboidColor = new Color(0.2,0.2,0.7,1.0);
    const cuboidLineColor = Color.black();

    const torusInnerRadius = 75;
    const torusOuterRadius = 150;
    const torusPosition = new Vector3(0, 100, 50);
    const torusResolution = 10;
    const torusLineColor = Color.white();
    const torusColor = new Color(0.2,0.2,0.7,1.0);

    const sphereRadius = 100;
    const spherePosition = new Vector3(200, 0, 50);
    const sphereResolution = 3;
    const sphereLineColor = Color.white();
    const sphereColor = new Color(0.7,0.7,0.2,1.0);


    let glObjects = [];
    let cube = Cuboid.createBasic(cuboidDimensions, cuboidPosition, cuboidLineColor, cuboidColor);
    cube.localRotation = cuboidRotation;
    let torus = Torus.createBasic(torusInnerRadius, torusOuterRadius, torusResolution, torusPosition, torusLineColor, torusColor);
    let shere = RecursiveSphere.createBasic(sphereRadius, sphereResolution, sphereLineColor, sphereColor);
    shere.localPosition = spherePosition;
    colorRandom(cube);
    //colorRandom(torus);
    glObjects.push(cube);
    glObjects.push(torus);
    glObjects.push(shere);

    // ------------------------------------------
    // Creates scene 
    // ------------------------------------------

    let cam = Camera.createPerspective();
    const clearColor = [0.2,0.2,0.2,1.0];
    return new Scene(clearColor, glObjects, cam);
}

function render()
{
    renderer.render(scene);
}

function colorRandom(glObject)
{
    for (let index = 0; index < glObject.vertices.length; index++) {
        glObject.setSingleFaceColor(index, Color.random());
    }
}