
// import { setup, right_player, left_player, Ball, globalVar} from './objects';


// var player1 = 0

// export  function ball_animation(){
//     Ball.positionX += Ball.velocityX ;
//     Ball.positionY -= Ball.velocityY;
//     if((Ball.positionY - Ball.radius) > (globalVar.Height / 2) - (Ball.radius * 2))
//         Ball.velocityY *= -1
//     if((Ball.positionY + Ball.radius) * -1  > (globalVar.Height / 2) - (Ball.radius * 2))
//         Ball.velocityY *= -1;
//     if(Ball.positionY > left_player.positionY + (globalVar.PuddleHeight / 2) ||
//      Ball.positionY < (left_player.positionY - (globalVar.PuddleHeight / 2))){
//         // console.log("yes")
//             player1 +=1;
//             // Ball.positionX = 0;
//             // Ball.positionY = 0;
//             // Ball.velocityX = 7;
//             // Ball.velocityY = 7;
//     }
//     else {
//     if(Ball.positionX + (Ball.radius * 2) > left_player.positionX)
//         Ball.velocityX *= -1;
//         if(Ball.positionX - (Ball.radius * 2) < right_player.positionX)
//         Ball.velocityX *= -1;
//     }
// }

// export function rander(ball: any, L_puddle: any, R_puddle: any) {
//     L_puddle.position.set(left_player.positionX, left_player.positionY, 0);
//     R_puddle.position.set(right_player.positionX, right_player.positionY, 0);
//     ball.position.set(Ball.positionX, Ball.positionY, 0);
//     ball_animation()
//     setup.renderer.render(setup.scene, setup.camera);
   
//     window.addEventListener('resize', () => {
//         setup.renderer.domElement.style.width = window.innerWidth + 'px';
//         setup.renderer.domElement.style.height = window.innerHeight + 'px';
//         setup.camera.aspect = setup.renderer.domElement.clientWidth / setup.renderer.domElement.clientHeight;
//         setup.renderer.setSize(setup.renderer.domElement.clientWidth, setup.renderer.domElement.clientHeight);
//         setup.camera.updateProjectionMatrix();
//     });
// }