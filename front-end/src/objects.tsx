import * as THREE from 'three';

export var globalVar = {
    Width: 1600,
    Height: 600,
    PuddleHeight : 200,
    PuddleWight : 50,
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

export  var fromBack = {
    posX : 0,
    posY : 0,
};

export var Values = {
    Btop : Ball.positionY - Ball.radius,
    Bbottom : Ball.positionY + Ball.radius,
    Bleft : Ball.positionX - Ball.radius,
    Bright : Ball.positionX + Ball.radius,
    RightPtop : right_player.positionY,
    RightPbottom : right_player.positionY + globalVar.PuddleHeight,
    LeftPtop : left_player.positionY,
    LeftPbottom : left_player.positionY + globalVar.PuddleWight,
    Pleft : left_player.positionX,
    Pright : right_player.positionX
};