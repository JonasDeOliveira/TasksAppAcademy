import React, { ReactNode}  from 'react';

export interface Props {
    test: boolean;
    children: ReactNode;
}

function If({test, children}: Props) {
    if(test) {
        return <>{children}</>
    } 

    return <></>
}

export default If