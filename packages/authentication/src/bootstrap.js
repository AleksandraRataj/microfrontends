import React from 'react';
import ReactDOM from 'react-dom';
import {createMemoryHistory, createBrowserHistory} from 'history';

import {StoreProvider} from 'store/StoreApp';

import App from './App';

const mount = (element, {initialPath, onNavigate, onSignIn, defaultHistory }) => {
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
                onSignIn={onSignIn}
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
    const devRoot = document.querySelector('#authentication-dev-root');

    if(devRoot){
        mount(devRoot, {
            defaultHistory: createBrowserHistory(),
        });
    }
}

export {mount};