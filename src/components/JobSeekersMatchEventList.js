import JobSeekersEventItem from "./JobSeekersMatchEventItem";
import {useDispatch, useSelector} from 'react-redux';
import {setEventListOnDisplay, setCurrentUser} from '../mainsSlice';
import { useEffect } from "react";

function JobSeekersMatchEventList() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)
  const eventListOnDisplay = useSelector(state => state.eventListOnDisplay)
  const needFetchUser = useSelector(state => state.needFetchUser)

  useEffect(() => {
    fetch(`http://localhost:3000/job_seekers/${currentUser.id}`)
    .then(res => res.json())
    .then(data => dispatch(setCurrentUser(data)))
    .catch(error => console.error('Error:', error))
  }, [needFetchUser])

  if (currentUser === null) {
    return <h2>Loading...</h2> 
  } else { dispatch(setEventListOnDisplay(currentUser.all_matching_events_for_front_end)) }


  return (
    <div className="match-event-list">
      {eventListOnDisplay.map(matchingEvent => 
        <JobSeekersEventItem key={matchingEvent.id} matchingEvent={matchingEvent}/>)
      }
    </div>
  )
  }
  
  export default JobSeekersMatchEventList;
