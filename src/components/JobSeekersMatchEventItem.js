import {useSelector, useDispatch} from 'react-redux';
import {setEventListOnDisplay, setUserEvents, setNeedFetchUser} from '../mainsSlice';

function JobSeekersMatchEventItem({ matchingEvent }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)
  const eventListOnDisplay = useSelector(state => state.eventListOnDisplay)
  const userEvents = useSelector(state => state.userEvents)

  const addJobSeekerEvent = (jobseeker_id, event_obj) => {
    //POST add_event table
    fetch("http://localhost:3000/add_events", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            job_seeker_id: jobseeker_id,
            event_id: event_obj.id
          })
    })
    //update state on matching eventlist 
    dispatch(setEventListOnDisplay(eventListOnDisplay.filter(matchingEvent => matchingEvent.id !== event_obj.id)));

  }


    return (

      <div className="job-seekers-match-event-item">
          <div className="event-photo-wrapper">
            <img className="event-photo" src={matchingEvent.image} alt={matchingEvent.name} />
          </div>
          <div className="event-detail-contianer">
            <h2 className="event-name" >{matchingEvent.name}</h2>
            <p>{matchingEvent.event_date}</p>
            <p>{matchingEvent.location}</p>
            <p>{matchingEvent.description}</p>
            <br></br>
            <button className="add-event-js" onClick={()=>{addJobSeekerEvent(currentUser.id, matchingEvent)}}>Going</button>
          </div>
      </div>

    );
  }
  
  export default JobSeekersMatchEventItem;



