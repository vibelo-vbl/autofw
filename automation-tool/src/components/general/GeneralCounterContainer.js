import {useContext} from 'react';
import {GeneralCounterContext} from '../../context/GeneralCounterContext';

const GeneralCounterContainer = () => {

  const generalCounter = useContext(GeneralCounterContext);

  return (
    <div>
      <span>General Counter: {generalCounter.counterNumber}</span>
    </div>
  );
};

export default GeneralCounterContainer;