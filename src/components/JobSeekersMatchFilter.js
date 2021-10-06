import {useDispatch, useSelector} from 'react-redux';
import {setEventListOnDisplay, setShowMobileRecruiterInfo} from '../mainsSlice'

function JobSeekersMatchFilter() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)
  const eventListOnDisplay = useSelector(state => state.eventListOnDisplay)
  
  const onAllMatchingEventBtnClick = () => {
    dispatch(setEventListOnDisplay(currentUser.all_matching_events_for_front_end))
    dispatch(setShowMobileRecruiterInfo(null))
  }

  const onSearchChange=(input) => {
    dispatch(setEventListOnDisplay(currentUser.all_matching_events_for_front_end.filter(e=> 
      e.description.toLocaleLowerCase().includes(input.toLocaleLowerCase()) || 
      e.event_date.toLocaleLowerCase().includes(input.toLocaleLowerCase()) || 
      e.location.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
      e.name.toLocaleLowerCase().includes(input.toLocaleLowerCase())
    )))
  }

    return (
      <div className="filter">
      <input id="search-bar" type="text" placeholder="Search Event" 
             onChange={(e)=>{onSearchChange(e.target.value)}}/>
      {eventListOnDisplay.length < currentUser.all_matching_events_for_front_end.length ?
      <button className="all-event-button" onClick={onAllMatchingEventBtnClick}>All Matching Events</button>
      : null
      }
    </div>
    );
  }
  
  export default JobSeekersMatchFilter;