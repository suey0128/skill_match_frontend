import JobSeekersEventItem from "./JobSeekersMatchEventItem";
import {useDispatch, useSelector} from 'react-redux';
import {setEventListOnDisplay} from '../mainsSlice';
import { useEffect } from "react";

function JobSeekersMatchEventList() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)
  const eventListOnDisplay = useSelector(state => state.eventListOnDisplay)

  useEffect(() => {
    dispatch(setEventListOnDisplay(currentUser.all_matching_events_for_front_end))
  }, [])

  // console.log("eventListOnDisplay:",eventListOnDisplay)
  return (
    <div className="match-event-list">
      {eventListOnDisplay.map(matchingEvent => 
        <JobSeekersEventItem key={matchingEvent.id} matchingEvent={matchingEvent}/>)
      }
    </div>
  )
  }
  
  export default JobSeekersMatchEventList;

  //id, event-name, event-location, event-date, event-image, event-description
  //recruiter-name, recuiter-company-name