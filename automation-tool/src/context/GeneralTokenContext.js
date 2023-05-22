import { createContext, useState, useEffect } from 'react';

const GeneralTokenContext = createContext();

const GeneralTokenContextProvider = function (props) {

  function getTokenfromLocalStorage() {
    const token = localStorage.getItem("AT-token")
    if (token) {
      return token
    }
    return null
  }
  const [tokenNumber, setTokenNumber] = useState(getTokenfromLocalStorage)

  useEffect(() => {
    if (!tokenNumber) {
      localStorage.removeItem("AT-token")
    }
    else {
      localStorage.setItem("AT-token", tokenNumber)
    }
  }, [tokenNumber]);
  return (
    <GeneralTokenContext.Provider value={{
      tokenNumber: tokenNumber,
      setTokenNumber: setTokenNumber
    }}>
      {props.children}
    </GeneralTokenContext.Provider>
  )
};

export { GeneralTokenContext, GeneralTokenContextProvider }