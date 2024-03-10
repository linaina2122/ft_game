import * as THREE from 'three';

// export var size = {
//     width: window.innerWidth,
//     height: window.innerHeight
// };

export var globalVar = {
    Width: 1600,
    Height: 600
}

function cameraSetup(fov: number = 75, aspect: number = window.innerWidth / window.innerHeight, near: number = 0.1, far: number = 5000, position: THREE.Vector3 = new THREE.Vector3(0, 0, 1000)): THREE.PerspectiveCamera {
    let camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(position.x, position.y, position.z)
    return camera
}

export const setup = {
    renderer: new THREE.WebGLRenderer(),
    scene: new THREE.Scene(),
    camera: cameraSetup(),
    Width: 1600,
    Height: 600
};

export var Ball = {
    positionX: 0,
    positionY: 0,
    cloneX: 0,
    cloneY: 0,
    radius: 25,
    segment: 100,
    velocityX: 7,
    velocityY: 7
};

export var right_player = {
    height: 200,
    width: 50,
    positionX: ((globalVar.Width / - 2) + 25),
    positionY: 0,
    velocity: 10
};
export var left_player = {
    height: 200,
    width: 50,
    positionX: ((globalVar.Width / + 2) - 25),
    positionY: 0,
    velocity: 10
};

export const buttonStyle = {
    height: 50,
    width: 70
}

export  var fromBack = {
    posX : 0,
    posY : 0,
};