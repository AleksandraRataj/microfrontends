import React, {useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';

import {mount} from 'admin/AdminApp';

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    console.log(history.location.pathname)

    useEffect(() => {
        const {onContainerNavigate} = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: (location) => {
                const {pathname: nextPathname} = location;

                if(history.location.pathname !== nextPathname){
                    history.push(nextPathname);
                }
            }
        });

        history.listen(onContainerNavigate);
    }, []);

    return <div ref={ref}></div>
}