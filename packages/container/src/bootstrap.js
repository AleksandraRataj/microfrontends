import React from 'react';
import ReactDOM from 'react-dom';

import {StoreProvider} from 'store/StoreApp';

import App from './App';

ReactDOM.render(
    <StoreProvider>
        <App/>
    </StoreProvider>,
    document.querySelector('#root')
);