import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {BokehPass} from 'three/examples/jsm/postprocessing/bokehPass';
import {state} from './controls';
import Magnify3d from 'magnify-3d-new';

const magnify3d = new Magnify3d();
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000000 );
camera.enableZoom = true;

export const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 1 );
document.body.appendChild( renderer.domElement );
renderer.autoClear = true;

// depth of field
const renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight);
export const composer = new EffectComposer( renderer, renderTarget );
composer.renderToScreen = false;

const renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );
const bokehValues = {
    focus: 100,
    aperture: 0.02,
    maxblur: 10000,
    width: window.innerWidth,
    height: window.innerHeight
}

export const bokehPass = new BokehPass( scene, camera, bokehValues);
composer.addPass( bokehPass );
renderer.setRenderTarget(renderTarget);
console.log(renderTarget);

export function animate() {

    if(state.arrowUp) {
        camera.position.y += .01;
    }

    if(state.arrowDown) {
        camera.position.y -= .01;
    }

    if(state.arrowLeft) {
        camera.position.x -= .01;
    }

    if(state.arrowRight) {
        camera.position.x += .01;
    }

	requestAnimationFrame( animate );
    composer.render();
    console.log(`before`, renderTarget);

    magnify3d.render({
        renderer: renderer,
        pos: {
            x: window.innerWidth/2,
            y: window.innerHeight/2
        },
        renderSceneCB: (target) => {
            if (target) {
                renderer.setRenderTarget(target);
            } else {
                renderer.setRenderTarget(null);
            }
            renderer.render(scene, camera);
        },
        radius: window.innerWidth/6,
        exp: 150,
        zoom: state.magnification,
        inputBuffer: renderTarget,
        outputBuffer: renderTarget
    });

}