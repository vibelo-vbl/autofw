
import { useState } from 'react';

const useMyhook = () => {

    const [saludo, setSaludo] = useState('Hola!');
    return { saludo, setSaludo }
}

export default useMyhook;