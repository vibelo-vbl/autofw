

import useGeolocation from "../../hooks/useGeolocation";


function Map() {
    const { location, setLocation } = useGeolocation()
    return (
        <div className="Map">
            {location ? <h3>{location.coords.latitude}</h3> : null}
        </div>
    );
}

export default Map;