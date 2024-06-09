import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const mount = (element) => {
    console.log("Marketing App");

    ReactDOM.render(
        <App/>,
        element
    )
}

if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#marketing-dev-root');

    if(devRoot){
        mount(devRoot);
    }
}

export {mount};