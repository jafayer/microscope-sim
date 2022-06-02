import {camera, renderer, bokehPass } from './scene';

export const state = {
        shift: false,
        arrowUp: false,
        arrowDown: false,
        arrowLeft: false,
        arrowRight: false,
        magnification: 5
};
export function handleWheel(e) {
    if(e.deltaY < 0) {
        const add = state.shift ? .1 : 1;
        // if (bokehPass.uniforms.focus.value + add > 50) {
        //     return bokehPass.uniforms.focus.value = 50;
        // }

        bokehPass.uniforms.focus.value += add;
    } else {
        const add = state.shift ? -.1 : -1;
        // if (bokehPass.uniforms.focus.value + add < -100) {
        //     return bokehPass.uniforms.focus.value = -100;
        // }

        bokehPass.uniforms.focus.value += add;
    }

    console.log(bokehPass.uniforms.focus.value);
}


export function handleWheelClick(e) {
    if(e.button === 1) {
        bokehPass.uniforms.focus.value = 3;
    }
}

export function handleKeyDown(e) {
    // if currently holding shift
    if(e.key == "Shift") {
        state.shift = true;
    }

    if(e.key == "ArrowUp") {
        state.arrowUp = true;
    }

    if(e.key == "ArrowDown") {
        state.arrowDown = true;
    }

    if(e.key == "ArrowLeft") {
        state.arrowLeft = true;
    }

    if(e.key == "ArrowRight") {
        state.arrowRight = true;
    }

    // set Zoom factor
    if(e.key == "1") {
        state.magnification = 5;
        document.querySelector('#zoomFactor').innerText = `Zoom Factor: ${state.magnification}x`;
    } else if (e.key == "2") {
        state.magnification = 10;
        document.querySelector('#zoomFactor').innerText = `Zoom Factor: ${state.magnification}x`;
    } else if (e.key == "3") {
        state.magnification = 20;
        document.querySelector('#zoomFactor').innerText = `Zoom Factor: ${state.magnification}x`;
    } else if (e.key == "4") {
        state.magnification = 40;
        document.querySelector('#zoomFactor').innerText = `Zoom Factor: ${state.magnification}x`;
    }
}

export function handleKeyUp(e) {
    // stop holding shift key
    if(e.key == "Shift") {
        state.shift = false;
    }

    if(e.key == "ArrowUp") {
        state.arrowUp = false;
    }

    if(e.key == "ArrowDown") {
        state.arrowDown = false;
    }

    if(e.key == "ArrowLeft") {
        state.arrowLeft = false;
    }

    if(e.key == "ArrowRight") {
        state.arrowRight = false;
    }
}

export function handleResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
}