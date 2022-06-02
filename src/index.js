import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {BokehPass} from 'three/examples/jsm/postprocessing/bokehPass';
import { state, handleKeyDown, handleKeyUp, handleWheel, handleResize, handleWheelClick} from './controls';
import {camera, scene, renderer, composer, animate} from './scene';
import { CubicBezierCurve } from 'three';

// sets Zoom Factor text
document.querySelector('#zoomFactor').innerText = `Zoom Factor: ${state.magnification}x`;


// animate function

animate();

document.addEventListener('wheel', (e) => handleWheel(e));

document.addEventListener('keydown', (e) => handleKeyDown(e));

document.addEventListener('keyup', (e) => handleKeyUp(e));

document.addEventListener('mousedown', (e) => handleWheelClick(e));

window.addEventListener('resize', handleResize);