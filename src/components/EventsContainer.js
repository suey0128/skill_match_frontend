import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {setUserEvents, setNeedFetchUser, setCurrentUser} from '../mainsSlice';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import fetchPort from '../fetchPort';

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
        fetch(`${fetchPort}/job_seekers/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            dispatch(setCurrentUser(data))
            dispatch(setUserEvents(data.events))
        })
        .catch(error => console.error('Error:', error))
        :
        fetch(`${fetchPort}/recruiters/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            dispatch(setCurrentUser(data))
            dispatch(setUserEvents(data.events))
        })
        .catch(error => console.error('Error:', error))
    }, [])

    // when a user clicks on edit 
    const handleEventEdit = (id, name, date, location, desc) => {
        setEventView("edit")
        setEventId(id)
        setEventName(name)
        setEventDate(date)
        setEventDesc(desc)
        setEventLocation(location)
    }
    // when a user clicks on save edit 
    const handleEditSave = (e) => {
        e.preventDefault()
        let updated_event = {
            name: eventName,
            event_date: eventDate,
            location: eventLocation,
            description: eventDesc
        }
        fetch(`${fetchPort}/events/${eventId}`, {
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
    // when a user clicks on add 
    const handleEventAdd = () => {
        setEventView("add")
    }

    // when a user clicks on save add 
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

        fetch(`${fetchPort}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_event)
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setUserEvents([...userEvents, data]))
            setEventView("view")
        })
    }

    // when a user clicks on delete 
    const handleEventDelete = (deleteEvent, currentUser_id) => {
        //find the add_event.id
        let addEvent = currentUser.add_events.find(e=> e.event_id === deleteEvent.id && e.job_seeker_id === currentUser_id)
        fetch(`${fetchPort}/add_events/${addEvent.id}`, {
            method: "DELETE",
        })
        .catch(error => console.error('Error:', error))
        dispatch(setUserEvents(userEvents.filter(event => event.id !== deleteEvent.id)))
    }

    // when recruiter remove an event 
    const handleRecruiterEventDelete = (id) => {
        fetch(`${fetchPort}/events/${id}`, {
            method: "DELETE",
        })
        .catch(error => console.error('Error:', error))
        dispatch(setUserEvents(userEvents.filter(event => event.id !== id)));
        dispatch(setNeedFetchUser());
    }

    return (
      <div className="events-container">
        <div className="greeting-box">
            <h2>{`Hello, ${currentUser.name}`}</h2>
        </div>

        <div className="event-page-container">
            {/* Event List starts */}
            {userStatus === "recruiter"
                // if userStatus is Recruiter
                ? <>
                    {/* if view is view */}
                        {eventView === "view"
                        ? <div className="event-page-list">
                            <h1 className="going-event-list-title">Event List</h1>
                            <button className="add-event" onClick={() => handleEventAdd()}>Add New Event</button>
                            {userEvents.map((event) =>
                                (
                                    <div className="job-seekers-match-event-item" key={event.id}>
                                    <div className="event-photo-wrapper-event-page">
                                        <img className="event-photo" src={event.image} alt={event.name} />
                                    </div>
                                    <div className="event-detail-contianer">
                                        <h2 className="event-name" >{event.name}</h2>
                                        <p>{event.event_date}</p>
                                        <p>{event.location}</p>
                                        <p>{event.description}</p>
                                        <br></br>
                                        <div className="event-page-btn-group">
                                            <button className="add-event-js" onClick={() => handleEventEdit(event.id, event.name, event.event_date, event.location, event.description)}>Edit</button>
                                            <button className="add-event-js" onClick={() => handleRecruiterEventDelete(event.id)}>Remove</button>
                                        </div>
                                    </div>
                                    </div>   
                                )

                            )}
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
                                        <button className="save-event">Save Event</button>
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
                                    <button className="save-event">Save Edit</button>
                                </form>
                            </div>
                        }
                </>
                // if userStatus is Job Seeker
                : <div className="event-page-list">
                    <h1 className="going-event-list-title">Going Event List</h1>
                        {userEvents.map((event) =>
                            (
                                <div className="job-seekers-match-event-item" key={event.id}>
                                    <div className="event-photo-wrapper-event-page">
                                        <img className="event-photo" src={event.image} alt={event.name} />
                                    </div>
                                    <div className="event-detail-contianer">
                                        <h2 className="event-name" >{event.name}</h2>
                                        <p>{event.event_date}</p>
                                        <p>{event.location}</p>
                                        <p>{event.description}</p>
                                        <br></br>
                                        <button className="add-event-js" onClick={() => handleEventDelete(event,currentUser.id)}>Remove</button>
                                    </div>
                                </div>                            
                            )
                        )}
                </div>
            }
        </div>

      </div>
    );
  }

  export default EventsContainer;