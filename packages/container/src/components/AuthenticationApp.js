import React, {useEffect, useRef} from 'react';

import {mount} from 'authentication/AuthenticationApp';

export default () => {
    const ref = useRef(null);

    useEffect(() => {
        mount(ref.current);
    });

    return <div ref={ref}></div>
}