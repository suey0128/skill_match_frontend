import {useSelector, useDispatch} from 'react-redux';
import {setNeedFetchUser} from '../mainsSlice';

function JobSeekersMatchEventItem({ matchingEvent }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)

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
      //fetch currentUser
      dispatch(setNeedFetchUser());
    }

    return (
      <div >
        <li className="job-seekers-match-event-item">
            <div className="event-photo-wrapper">
              <img src={matchingEvent.image} alt={matchingEvent.name} className="event-photo"/>
            </div>
            <div className="event-detail-contianer">
              <h2 className="event-name" >{matchingEvent.name}</h2>
              <p>{matchingEvent.event_date}</p>
              <p>{matchingEvent.location}</p>
              <p>{matchingEvent.description}</p>
              <br></br>
            </div>
            <button className="add-event-js" onClick={()=>{addJobSeekerEvent(currentUser.id, matchingEvent)}}>Add Event</button>
        </li>
      </div>
    );
  }
  
  export default JobSeekersMatchEventItem;



