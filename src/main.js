// Copyright: Sebastian Baier (sebastian.baier93@hotmail.de) 2020


webglMain();
main();

const cameraRadius = 500;
const camerRotationDelta = 1;


function main()
{
    const deltaZoom = 0.75;

    document.addEventListener('keydown', onKeyDown);

    function onKeyDown(event)
    {
        if(event.keyCode == 37 || event.keyCode == 76)
        {
            rotateCamera(camerRotationDelta);
        }
        if(event.keyCode == 39 || event.keyCode == 82) 
        {
            rotateCamera(-camerRotationDelta);
        }
        if(event.keyCode == 38 || event.keyCode == 87) 
        {
            rotateCamera(camerRotationDelta);
        } 
        if(event.keyCode == 40 || event.keyCode == 83) 
        {
            rotateCamera(-camerRotationDelta);
        } 
        if(event.keyCode == 189 || event.keyCode == 109) 
        {
            zoom(deltaZoom);
        } 
        if(event.keyCode == 187 || event.keyCode == 107) 
        {
            zoom(-deltaZoom);
        } 
    }

    function rotateCamera(deltaAngle)
    {
        scene.camera.rotateAroundCenterY(scene.camera.rotation[1]+deltaAngle, cameraRadius);
        //console.log(scene.camera.rotation[1], deltaAngle);
        render();
    }

    function zoom(delta)
    {
        scene.camera.setFieldOfView(scene.camera.fieldOfView + delta);
        render();
    }

    render();
}