// Copyright: Sebastian Baier (sebastian.baier93@hotmail.de) 2020


webglMain();
main();




function main()
{
    const deltaZoom = 0.75;
    const cameraRadius = 500;
    const camerRotationDelta = 1;

    document.addEventListener('keydown', onKeyDown);

    function onKeyDown(event)
    {
        if(event.keyCode == 37 || event.keyCode == 65)
        {
            rotateCameraY(camerRotationDelta);
        }
        if(event.keyCode == 39 || event.keyCode == 68) 
        {
            rotateCameraY(-camerRotationDelta);
        }
        if(event.keyCode == 38 || event.keyCode == 87) 
        {
            rotateCameraX(camerRotationDelta);
        } 
        if(event.keyCode == 40 || event.keyCode == 83) 
        {
            rotateCameraX(-camerRotationDelta);
        } 
        if(event.keyCode == 189 || event.keyCode == 109) 
        {
            zoom(deltaZoom);
        } 
        if(event.keyCode == 187 || event.keyCode == 107) 
        {
            zoom(-deltaZoom);
        } 
        if(event.keyCode == 188) 
        {
            addRecursion(-1);
        } 
        if(event.keyCode == 190) 
        {
            addRecursion(1);
        } 
    }

    function rotateCameraY(deltaAngle)
    {
        let r = scene.camera.rotation;
        scene.camera.rotateAroundCenter([r[0], r[1]+deltaAngle, r[2]], cameraRadius);
        //console.log(scene.camera.rotation[1], deltaAngle);
        render();
    }

    function rotateCameraX(deltaAngle)
    {
        let r = scene.camera.rotation;
        scene.camera.rotateAroundCenter([r[0] + deltaAngle, r[1], r[2]], cameraRadius);
        //console.log(scene.camera.rotation[1], deltaAngle);
        render();
    }

    function zoom(delta)
    {
        scene.camera.setFieldOfView(scene.camera.fieldOfView + delta);
        render();
    }

    function addRecursion(delta)
    {
        let sphere = scene.glObjects[2];
        sphere.setRecursions(sphere.recursions + delta);
        sphere.updateMesh();
        render();
    }

    scene.camera.position = [0,0,cameraRadius];
    scene.camera.rotation = [15,30,0];
    render();
}