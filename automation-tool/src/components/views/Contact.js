import { GeneralTokenContext } from '../../context/GeneralTokenContext'
import GeneralCounterContainer from '../general/GeneralCounterContainer'
import { useContext } from 'react';
import useMyhook from '../../hooks/useMyhook';


function Contact() {

  const { saludo, setSaludo } = useMyhook();
  const generalToken = useContext(GeneralTokenContext);

  return (
    <div className="Contact">
      <h1>Contact!</h1>
      <span>General Token: {generalToken.tokenNumber}</span>
      <h1>{saludo}</h1>
      <GeneralCounterContainer />

    </div>
  );
}

export default Contact;
