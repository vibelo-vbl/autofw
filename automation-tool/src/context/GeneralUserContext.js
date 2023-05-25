import { createContext, useState } from 'react';

const GeneralUserContext = createContext();

const GeneralUserContextProvider = function (props) {

    const [user, setUser] = useState(null)

    return (
        <GeneralUserContext.Provider value={{
            user,
            setUser,
        }}>
            {props.children}
        </GeneralUserContext.Provider>
    )
};

export { GeneralUserContext, GeneralUserContextProvider }