import { useState, useContext } from "react";
import { toast } from 'react-toastify'
import { GeneralTokenContext } from '../context/GeneralTokenContext'


const useRequest = (initialdata) => {
    const [data, setData] = useState(initialdata);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const generalToken = useContext(GeneralTokenContext);

    const request = async (endpoint, method, body) => {
        try {
            setLoading(true);
            setError(null);

            const myHeaders = new Headers();
            if (endpoint == '/auth/login') {
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            }
            else {
                myHeaders.append("Authorization", `Bearer ${generalToken.tokenNumber}`);
                myHeaders.append("Content-Type", "application/json");
            }
            const response = await fetch(endpoint, {
                "headers": myHeaders,
                "method": method,
                "body": body ? JSON.stringify(body) : undefined
            })
            if (response.status === 401) {
                throw new Error('Session Expired')
            }
            if (response.status === 400) {
                throw new Error('Authentication failed')
            }
            if (response.status === 404) {
                throw new Error('Not Found')
            }
            if (response.status !== 200) {
                const errorText = await response.text()
                throw new Error(errorText)
            }
            const requestData = await response.json()
            if (requestData.error) {
                throw new Error(requestData.error)
            }
            setData(requestData);
        }
        catch (error) {
            if (error.message === 'Session Expired') {
                toast.warn('Session Expired')
                generalToken.setTokenNumber(null)
                return
            }
            if (error.message === 'Authentication failed') {
                toast.warn('Authentication failed')
                generalToken.setTokenNumber(null)
                return
            }
            console.log(error.message)
            setError(error.message)
        }
        finally { setLoading(false) }

    }


    return { data, isLoading, error, request }

}

export default useRequest;