import JobSeekersEventItem from "./JobSeekersMatchEventItem";
import {useDispatch, useSelector} from 'react-redux';
import {setEventListOnDisplay, setMatchingEventLeft} from '../mainsSlice';
import { useEffect } from "react";
import fetchPort from '../fetchPort';

function JobSeekersMatchEventList() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)
  const eventListOnDisplay = useSelector(state => state.eventListOnDisplay)
  const matchingEventLeft = useSelector(state => state.matchingEventLeft)

  useEffect(() => {
    fetch(`${fetchPort}/job_seekers/${currentUser.id}`)
    .then(res => res.json())
    .then(data => {
      dispatch(setMatchingEventLeft(data.all_matching_events_for_front_end))
      dispatch(setEventListOnDisplay(data.all_matching_events_for_front_end))
    })
    .catch(error => console.error('Error:', error))
  }, [])


  return (
    <div className="match-event-list">
      {
        eventListOnDisplay.length > 0 ? 
        (eventListOnDisplay.map(matchingEvent => 
          <JobSeekersEventItem key={matchingEvent.id} matchingEvent={matchingEvent}/>))
         : 
        (matchingEventLeft.length === 0 ? 
        <h2>Sorry, currently there isn't any matching event for you. Please check back later. </h2>
        :
        <h2>You are going to all the events from this recruiter, please go to your event page to see event details.</h2>
        )
      }

    </div>
  )
  }
  
  export default JobSeekersMatchEventList;
