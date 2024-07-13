import React from 'react';
import ReactDOM from 'react-dom';
import {createMemoryHistory} from 'history';

import {StoreProvider} from 'store/StoreApp';

import App from "./App";

const mount = (element, {initialPath, onNavigate, defaultHistory }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath],
    });

    if(onNavigate){
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <StoreProvider>
            <App
                history={history}
            />
        </StoreProvider>,
        element
    );

    return {
        onContainerNavigate(location) {
            const {pathname: nextPathname} = location;

            if(history.location.pathname !== nextPathname){
                history.push(nextPathname);
            }
        }
    }
}

if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#admin-dev-root');

    if(devRoot){
        mount(devRoot);
    }
}

export {mount};