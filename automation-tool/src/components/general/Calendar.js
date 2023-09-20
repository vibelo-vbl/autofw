import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timegridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnclickoutside';
import styles from "./Calendar.module.scss";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import useRequest from "../../hooks/useRequest";
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

//import './Calendar.style.css'
//import esLocale from '@fullcalendar/core/locales/es'

function Calendar({ list_changes, onSetdates }) {

    return (
        <>
            <FullCalendar
                eventContent={(eventInfo) => {
                    return <CustomEventContent eventInfo={eventInfo} />
                }}
                plugins={[dayGridPlugin, timegridPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth" }}
                events={list_changes}
                datesSet={onSetdates}
            // events={[
            //     { id: 1245, title: "Change_1", date: "2023-03-06" },
            //     { id: 2345, title: "Change_2", start: "2023-03-04 17:00", end: "2023-03-05 19:00" },
            //     { id: 3456, title: "Change_3", start: "2023-03-04 17:00", end: "2023-03-04 19:00" }]}
            // eventClick={handlerClickEvent}
            //locale={esLocale}
            />
        </>
    );
}

function CustomEventContent({ eventInfo }) {
    // debugger
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const refModal = useRef(null);
    const { data: event, isLoading: isLoadingEvent, error: errorEvent, request: getEvent } = useRequest(null)

    const handlerOnclickoutside = () => {
        setActive(false);
    }

    useEffect(() => {
        // getChanges()
        if (active) {
            console.log(eventInfo)
            getEvent(`/change/${eventInfo.event.id}`, 'GET')
        }
    }, [active]);

    useOnClickOutside(refModal, handlerOnclickoutside);
    return (
        <>
            <div className={styles.customEventcontainer} onPointerEnter={() => {
                // console.log(eventInfo.event.title)
            }} >
                {/* <div className={`${styles.modalContainer} ${active ? styles.active : ''}`} ref={refModal}>
                    <h2>{eventInfo.event.title}</h2>
                    <h3>
                        <span>Assignment Group:</span> {eventInfo.event.extendedProps.assigment_group}
                    </h3>
                    <p>
                        <span>Description:</span> {eventInfo.event.extendedProps.description}
                    </p>
                    <Link to={`/event/${eventInfo.event.id}`}>View details</Link>
                </div> */}
                <Dialog fullScreen open={active} onClose={handlerOnclickoutside}>
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handlerOnclickoutside}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                {event ? event.title : 'Loading'}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {event ?
                        <>
                            <List>
                                <ListItem>
                                    <ListItemText primary='Change Number' secondary={event.extendedProps.category} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Company' secondary={event.extendedProps.company} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Service Offering' secondary={event.extendedProps.service_offering} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Configuration Item' secondary={event.extendedProps.configuration_item} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Priority' secondary={event.extendedProps.priority} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Risk' secondary={event.extendedProps.risk} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Impact' secondary={event.extendedProps.impact} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Assigment Group' secondary={event.extendedProps.assigment_group} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Assigned To' secondary={event.extendedProps.assigned_to} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Description' secondary={event.extendedProps.description} />
                                </ListItem>
                                <Divider />
                            </List>
                            {/* <span>Category: {event.extendedProps.category}</span>
                            <span>Company: {event.extendedProps.company}</span>
                            <span>Service Offering: {event.extendedProps.service_offering}</span>
                            <span>Configuration Item: {event.extendedProps.configuration_item}</span>
                            <span>Priority: {event.extendedProps.priority}</span>
                            <span>Risk: {event.extendedProps.risk}</span>
                            <span>Impact: {event.extendedProps.impact}</span>
                            <span>Assigment Group: {event.extendedProps.assigment_group}</span>
                            <span>Assigned To: {event.extendedProps.assigned_to}</span>
                            <span>Description: {event.extendedProps.description}</span> */}
                        </> : null}
                </Dialog>

                <div className={styles.customEventname} onClick={() => {
                    setActive(true)
                }} >{eventInfo.event.title}</div>
            </div>

        </>
    );

}

export default Calendar;

