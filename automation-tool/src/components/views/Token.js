import { GeneralTokenContext } from '../../context/GeneralTokenContext'
import { useContext } from 'react';


function Token() {

    const generalToken = useContext(GeneralTokenContext);

    function handlerOnsubmit(e) {
        e.preventDefault()
        const token = e.target.querySelector("input[type='text']").value
        generalToken.setTokenNumber(token)
    }



    return (
        <div>
            <h1>Token!</h1>
            <form onSubmit={handlerOnsubmit}>
                <div>
                    <input type="text" />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Token;