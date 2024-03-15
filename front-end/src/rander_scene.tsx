import * as THREE from 'three'
import { setup, right_player, left_player, Ball, fromBack, globalVar } from './objects';
import { rander_ball, puddles } from './create_objects';
import { useEffect, useRef } from 'react';
import { Player } from './App';

function ball_animation() {
    Ball.positionX = fromBack.posX;
    Ball.positionY = fromBack.posY
}

function rander(ball: any, L_puddle: any, R_puddle: any) {
    L_puddle.position.set(left_player.positionX, left_player.positionY, 0);
    R_puddle.position.set(right_player.positionX, right_player.positionY, 0);
    ball.position.set(Ball.positionX, Ball.positionY, 0);
    ball_animation();
    setup.renderer.render(setup.scene, setup.camera);
    window.addEventListener('resize', () => {
        setup.renderer.domElement.style.width = window.innerWidth + 'px';
        setup.renderer.domElement.style.height = window.innerHeight + 'px';
        setup.camera.aspect = setup.renderer.domElement.clientWidth / setup.renderer.domElement.clientHeight;
        setup.renderer.setSize(setup.renderer.domElement.clientWidth, setup.renderer.domElement.clientHeight);
        setup.camera.updateProjectionMatrix();
    });
}

export function InitSetup() {
    const ref = useRef(null);
    let isRight = false;
    let isLeft = false;
    useEffect(() => {
        setup.renderer.setSize(innerWidth, innerHeight);
        document.body.appendChild(setup.renderer.domElement);
        setup.scene.add(setup.camera);
        const plan = new THREE.PlaneGeometry(setup.Width, setup.Height);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        const cub = new THREE.Mesh(plan, material);
        cub.position.set(0, 0, 0);
        setup.scene.add(cub);
        const ball = rander_ball();
        const R_puddle = puddles();
        const L_puddle = puddles();
        Player.on("Puddle2", (data) => {
            isRight = data;
            Player.on("left", (data: number) => {
                console.log(data);
                left_player.positionY = data;
            })
        })
        Player.on("Puddle1", (data) => {
            isLeft = data;
            Player.on("right", (data: number) => {
                right_player.positionY = data;
            })
        })
        document.onkeydown = function (e) {
            if(isRight){
                if (e.keyCode === 38) {
                    
                    if (right_player.positionY > setup.Height - ((setup.Height / 2) + 100))
                        right_player.positionY += 0;
                else
                    right_player.positionY += 7;
            }
                else if (e.keyCode === 40) {
                    if (right_player.positionY < -1 * (setup.Height - ((setup.Height / 2) + 100)))
                        right_player.positionY -= 0;
                    else
                        right_player.positionY -= right_player.velocity;
                }
                Player.emit("rPlayer", {
                    y: right_player.positionY
                });
            }
            if(isLeft){
                if (e.keyCode === 38) {
                    if (left_player.positionY > setup.Height - ((setup.Height / 2) + 100))
                        left_player.positionY += 0;
                    else
                        left_player.positionY += left_player.velocity;
                }
                else if (e.keyCode === 40) {
                    if (left_player.positionY < -1 * (setup.Height - ((setup.Height / 2) + 100)))
                        left_player.positionY -= 0;
                    else
                        left_player.positionY -= left_player.velocity;
                }
            Player.emit("lPlayer", {
                y: left_player.positionY
            });
            }

        };
        setup.renderer.setAnimationLoop(() => {
            rander(ball, L_puddle, R_puddle);
        });
        return () => {

        };
    }, [/*  */])
    return (
        <div ref={ref}></div>

    );
};
