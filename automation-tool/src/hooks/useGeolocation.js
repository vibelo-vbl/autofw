import { useEffect, useState } from "react";

const useGeolocation = () => {

    const [location, setLocation] = useState(null);
    useEffect(() => {

        const geolocationCallback = (infoGeolocation) => {
            console.log(infoGeolocation)
            setLocation(infoGeolocation)
        }

        navigator.geolocation.getCurrentPosition(geolocationCallback)
    }, [])
    return { location, setLocation }
}
export default useGeolocation;