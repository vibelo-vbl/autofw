
import { useRouteError } from 'react-router-dom'
import React from 'react';

const Page404 = () => {
    const error = useRouteError();
    console.log(error)

    return (
        <div>
            <h1>Page 404!</h1>
        </div>
    );
};

export default Page404;