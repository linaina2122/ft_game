import * as THREE from 'three'
import { setup, right_player, left_player} from './objects';
import { rander_ball, puddles } from './create_objects';
import { useEffect, useRef } from 'react';
import { rander } from './animation';

 export function Duel() {
    const ref = useRef(null);
    useEffect(()=>{
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
        document.onkeydown = function (e) {
            if (e.keyCode === 87) {
                if (right_player.positionY > setup.Height - ((setup.Height / 2) + 100))
                    right_player.positionY += 0;
                else
                    right_player.positionY += right_player.velocity;
            }
            else if (e.keyCode === 83) {
                if (right_player.positionY < -1 * (setup.Height - ((setup.Height / 2) + 100)))
                    right_player.positionY -= 0;
                else
                    right_player.positionY -= right_player.velocity;
            }
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
        };
        setup.renderer.setAnimationLoop(() => {
            rander(ball, L_puddle, R_puddle);
        });
    return ()=> {

    };
},[/*  */])
return (
    <div ref={ref}></div>

  );
};