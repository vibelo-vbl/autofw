import { useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import { useEffect } from "react";
import Spinner from "../general/Spinner"

function EventDetail() {
    const params = useParams()
    const { data, isLoading, error, request } = useRequest(null)

    useEffect(() => {
        // getChanges()
        request(`/change/${params.id}`, 'GET')
    }, []);


    return (
        <>
            <h1>EventDetail!</h1>
            {isLoading ? <Spinner /> : null}
            {data !== null ? <>
                <h2>Title: {data.title}</h2>
                <h3>Number: {data.extendedProps.number}</h3>
                <h3>Category: {data.extendedProps.category}</h3>
                <h3>Company: {data.extendedProps.company}</h3>
                <h3>Service Offering: {data.extendedProps.service_offering}</h3>
                <h3>Configuration Item: {data.extendedProps.configuration_item}</h3>
                <h3>Priority: {data.extendedProps.priority}</h3>
                <h3>Risk: {data.extendedProps.risk}</h3>
                <h3>Impact: {data.extendedProps.impact}</h3>
                <h3>Assigment Group: {data.extendedProps.assigment_group}</h3>
                <h3>Assigned To: {data.extendedProps.assigned_to}</h3>
                <h3>Description: {data.extendedProps.description}</h3>
            </> : null}

        </>
    );
}

export default EventDetail;