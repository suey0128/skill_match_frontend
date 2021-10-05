import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {setUserEvents, setNeedFetchUser, setEventListOnDisplay, setCurrentUser} from '../mainsSlice';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#94aac4',
      }
    },
  });
  
  
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function EventsContainer() {
    const dispatch = useDispatch();

    const userStatus = useSelector(state => state.userStatus)
    const currentUser = useSelector(state => state.currentUser)
    const userEvents = useSelector(state => state.userEvents)
    const eventListOnDisplay = useSelector(state => state.eventListOnDisplay)

    const [eventView, setEventView] = useState("view") //"view", "edit", "add"
    const [eventId, setEventId] = useState(0)
    const [eventName, setEventName] = useState("")
    const [eventDate, setEventDate] = useState()
    const [eventLocation, setEventLocation] = useState("")
    const [eventDesc, setEventDesc] = useState("")
    const [eventImg, setEventImg] = useState("")

    const classes = useStyles();

    useEffect(() => {
        currentUser.recruiters ? 
        fetch(`http://localhost:3000/job_seekers/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            dispatch(setCurrentUser(data))
            dispatch(setUserEvents(data.events))
        })
        .catch(error => console.error('Error:', error))
        :
        fetch(`http://localhost:3000/recruiters/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            dispatch(setCurrentUser(data))
            dispatch(setUserEvents(data.events))
        })
        .catch(error => console.error('Error:', error))
    }, [])

    // when a user clicks on edit - DONE!!
    const handleEventEdit = (id, name, date, location, desc) => {
        // console.log(id, name, date, location, desc)
        setEventView("edit")
        setEventId(id)
        setEventName(name)
        setEventDate(date)
        setEventDesc(desc)
        setEventLocation(location)
    }
    // when a user clicks on save edit - DONE!!
    const handleEditSave = (e) => {
        e.preventDefault()
        let updated_event = {
            name: eventName,
            event_date: eventDate,
            location: eventLocation,
            description: eventDesc
        }
        fetch(`http://localhost:3000/events/${eventId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updated_event)
        })
        .then(res => res.json())
        .then(data =>
            {let event_updated = data;
            dispatch(setUserEvents(userEvents.map(event => {
                if (event.id === event_updated.id) {
                    return {
                        id: event_updated.id,
                        name: event_updated.name,
                        event_date: event_updated.event_date, 
                        location: event_updated.location,
                        description: event_updated.description
                    }
                } else {
                    return event
                }
            })))}
        )
        setEventView("view")
        dispatch(setNeedFetchUser());
    }
    // when a user clicks on add - DONE!!
    const handleEventAdd = () => {
        setEventView("add")
    }
    // when a user clicks on save add - DONE!!
    const handleAddSave = (e) => {
        e.preventDefault()
        
        // need to convert eventDate to DateTime in ruby/db
        let new_event = {
            recruiter_id: currentUser.id,
            name: eventName,
            event_date: eventDate, 
            location: eventLocation,
            description: eventDesc,
            image: eventImg
        }

        fetch("http://localhost:3000/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_event)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            dispatch(setUserEvents([...userEvents, data]))
            setEventView("view")
            // dispatch(setNeedFetchUser());
        })
    }

    // when a user clicks on delete - DONE!!
    const handleEventDelete = (deleteEvent, currentUser_id) => {
        //find the add_event.id

        let addEvent = currentUser.add_events.find(e=> e.event_id === deleteEvent.id && e.job_seeker_id === currentUser_id)
        // console.log(addEvent.id)
        fetch(`http://localhost:3000/add_events/${addEvent.id}`, {
            method: "DELETE",
        })
        .catch(error => console.error('Error:', error))
        dispatch(setUserEvents(userEvents.filter(event => event.id !== deleteEvent.id)))
        // dispatch(setEventListOnDisplay([...eventListOnDisplay, deleteEvent]))
        // dispatch eventListOnDisplay - need to update with the new event
    }

    // when recruiter remove an event 
    const handleRecruiterEventDelete = (id) => {
        fetch(`http://localhost:3000/events/${id}`, {
            method: "DELETE",
        })
        .catch(error => console.error('Error:', error))
        dispatch(setUserEvents(userEvents.filter(event => event.id !== id)));
        dispatch(setNeedFetchUser());
    }

    console.log('yo',userEvents)

    return (
      <div className="events-container">
        <div className="greeting-box">
            <h2>{`Hello, ${currentUser.name}`}</h2>
        </div>

        {userEvents.length === 0 ? 
        <h2>You event list is empty, go add some!</h2> 
        :
        <div className="events-content">
            {/* Event List starts */}
            {userStatus === "recruiter"
                // if userStatus is Recruiter
                ? <>
                    {/* if view is view */}
                        {eventView === "view"
                        ? <div className="event-list">
                            <h2>Event List</h2>
                            {userEvents.map((event) =>
                                (<div className="event-item-container">
                                    <span className="event-item-details">
                                        <h4>Name:</h4>
                                        <p>{event.name}</p>
                                    </span>
                                    <span className="event-item-details">
                                        <h4>Location:</h4>
                                        <p>{event.location}</p>
                                    </span>
                                    <span className="event-item-details">
                                        <h4>Date:</h4>
                                        <p>{event.event_date}</p>
                                    </span>
                                    <span className="event-item-details">
                                        <h4>Description:</h4>

                                        <p>{event.description}</p>
                                    </span>
                                    <span className="event-buttons">
                                        <button className="edit-event" onClick={() => handleEventEdit(event.id, event.name, event.event_date, event.location, event.description)}>Edit</button>
                                        <button className="remove-event" onClick={() => handleRecruiterEventDelete(event.id)}>Remove</button>
                                    </span>
                                </div>)

                            )}
                            <button className="add-event" onClick={() => handleEventAdd()}>Add New Event</button>
                        </div>
                        : eventView === "add"
                        // if view is add
                            ? <div className="event-add-form">
                                {/* form here */}
                                    <form className={classes.form} noValidate onSubmit={handleAddSave}>
                                        <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Event Name: "
                                        name="name"
                                        autoFocus
                                        onChange={(e)=>{setEventName(e.target.value)}}
                                        />
                                        <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="Date"
                                        label="Event Date (MM/DD/YYYY HH:MM)"
                                        id="date"
                                        onChange={(e)=>{setEventDate(e.target.value)}}
                                        />
                                        <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="Location"
                                        label="Event Location: "
                                        id="location"
                                        onChange={(e)=>{setEventLocation(e.target.value)}}
                                        />
                                        <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="desc"
                                        label="Event Description: "
                                        id="desc"
                                        onChange={(e)=>{setEventDesc(e.target.value)}}
                                        />
                                        <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="image"
                                        label="Event Image Url: "
                                        id="image"
                                        onChange={(e)=>{setEventImg(e.target.value)}}
                                        />
                                        <button className="add-save-skill">Add Event</button>
                                    </form>
                            </div>
                            // if view is edit
                            : <div className="event-edit">
                                {/* form here */}
                                <form className={classes.form} noValidate onSubmit={handleEditSave}>
                                    <h4>{`Editing: ${eventName}`}</h4>
                                    <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Event Name"
                                    name="name"
                                    autoFocus
                                    onChange={(e)=>{setEventName(e.target.value)}}
                                    value={eventName}
                                    />
                                    <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="date"
                                    label="Event Date"
                                    name="date"
                                    autoFocus
                                    onChange={(e)=>{setEventDate(e.target.value)}}
                                    value={eventDate}
                                    />
                                    <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="location"
                                    label="Event Location"
                                    name="location"
                                    autoFocus
                                    onChange={(e)=>{setEventLocation(e.target.value)}}
                                    value={eventLocation}
                                    />
                                    <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="desc"
                                    label="Event Description"
                                    name="desc"
                                    autoFocus
                                    onChange={(e)=>{setEventDesc(e.target.value)}}
                                    value={eventDesc}
                                    />
                                    <button className="edit-save-skill">Save Edit</button>
                                </form>
                            </div>
                        }
                </>
                // if userStatus is Job Seeker
                : <div className="event-list">
                    <h2>Event List</h2>
                        {userEvents.map((event) =>
                            (<div className="event-item-container">
                                <span className="event-item-details">
                                    <h4>Name:</h4>
                                    <p>{event.name}</p>
                                </span>
                                <span className="event-item-details">
                                    <h4>Location:</h4>
                                    <p>{event.location}</p>
                                </span>
                                <span className="event-item-details">
                                    <h4>Date:</h4>
                                    <p>{event.event_date}</p>
                                </span>
                                <span className="event-item-details">
                                    <h4>Description:</h4>
                                    {/* {console.log(event.description)} */}
                                    <p>{event.description}</p>
                                </span>
                                <span className="event-buttons">
                                    <button className="remove-event" onClick={() => handleEventDelete(event,currentUser.id)}>Remove</button>
                                </span>
                            </div>)
                        )}
                </div>
            }
        </div>
        }
      </div>
    );
  }

  export default EventsContainer;