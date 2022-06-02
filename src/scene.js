import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {BokehPass} from 'three/examples/jsm/postprocessing/bokehPass';
import {state} from './controls';
import Magnify3d from 'magnify-3d-new';

const magnify3d = new Magnify3d();


const renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
export const rtScene = new THREE.Scene();
export const rtCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000000 );

const geometry = new THREE.BoxGeometry( 10, 10, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

rtScene.add(cube);

rtCamera.position.z = 100;


export const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 1 );
document.body.appendChild( renderer.domElement );
renderer.autoClear = true;

// depth of field
export const composer = new EffectComposer( renderer, renderTarget );
composer.renderToScreen = false;

const renderPass = new RenderPass( rtScene, rtCamera );
composer.addPass( renderPass );
const bokehValues = {
    focus: 100,
    aperture: .00025,
    maxblur: 1,
    width: window.innerWidth,
    height: window.innerHeight
}

export const bokehPass = new BokehPass( rtScene, rtCamera, bokehValues);
composer.addPass( bokehPass );

// create new camera and scene to house glass
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000000 );
const scene = new THREE.Scene();
camera.position.z = 100;


// make a 512x512 plane geometry, a mesh that maps renderTarget.texture, and add it to the scene
const planeGeometry = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );
const planeMaterial = new THREE.MeshBasicMaterial( { map: renderTarget.texture } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );

renderer.set


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

    renderer.setClearColor( 0xffffff, 1 );
    renderer.setRenderTarget( renderTarget );
    composer.render(); // now composer has rendered to renderTarget
    renderer.setRenderTarget(null);
    renderer.setClearColor( 0x000000, 1 );
    renderer.render( scene, camera );
    
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
    });
    
    requestAnimationFrame( animate );
}