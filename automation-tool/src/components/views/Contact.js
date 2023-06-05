// import { GeneralTokenContext } from '../../context/GeneralTokenContext'
// import GeneralCounterContainer from '../general/GeneralCounterContainer'
import { useContext, useState } from 'react';
// import useMyhook from '../../hooks/useMyhook';


function Contact() {
  const [image, setImage] = useState(null);
  const convertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result)
    }
    reader.onerror = error => {
      console.log("Error:", error)
    }
  }

  // const { saludo, setSaludo } = useMyhook();
  // const generalToken = useContext(GeneralTokenContext);

  return (
    <div className="Contact">
      <h1>Contact!</h1>
      <input accept="image/*" type="file" onChange={convertToBase64} />
      {image == "" || image == null ? "" : <img width={100} height={100} src={image} />}
      {/* <span>General Token: {generalToken.tokenNumber}</span> */}
      {/* <h1>{saludo}</h1> */}
      {/* <GeneralCounterContainer /> */}

    </div>
  );
}

export default Contact;
