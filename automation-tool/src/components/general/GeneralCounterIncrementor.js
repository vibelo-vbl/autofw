import {useContext} from 'react';
import {GeneralCounterContext} from '../../context/GeneralCounterContext';

const GeneralCounterIncrementor = () => {

  const generalCounter = useContext(GeneralCounterContext);

  const handleOnClick = ()=>{
    //console.log('click');
    generalCounter.setCounterNumber((prevCounterNumber)=>{
      return prevCounterNumber + 1;
    })
  }

  return (
    <button onClick={handleOnClick}>Incrementar</button>
  );
};

export default GeneralCounterIncrementor;