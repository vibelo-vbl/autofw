import { createContext, useState } from 'react';

const GeneralCounterContext = createContext();

const GeneralCounterContextProvider = function (props) {

  const [counterNumber, setCounterNumber] = useState(50)

  return (
    <GeneralCounterContext.Provider value={{
      counterNumber: counterNumber,
      setCounterNumber: setCounterNumber,
    }}>
      {props.children}
    </GeneralCounterContext.Provider>
  )
};

export { GeneralCounterContext, GeneralCounterContextProvider }