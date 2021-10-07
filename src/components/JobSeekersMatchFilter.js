import {useDispatch, useSelector} from 'react-redux';
import {setEventListOnDisplay, setShowMobileRecruiterInfo} from '../mainsSlice';

function JobSeekersMatchFilter() {
  const dispatch = useDispatch();
  const eventListOnDisplay = useSelector(state => state.eventListOnDisplay)
  const matchingEventLeft = useSelector(state => state.matchingEventLeft)

  
  const onAllMatchingEventBtnClick = () => {
    dispatch(setEventListOnDisplay(matchingEventLeft))
    dispatch(setShowMobileRecruiterInfo(null))
  }

  const onSearchChange=(input) => {
    dispatch(setEventListOnDisplay(eventListOnDisplay.filter(e=> 
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
      {eventListOnDisplay.length < matchingEventLeft.length  ?
      <button className="all-event-button" onClick={onAllMatchingEventBtnClick}>All Matching Events</button>
      : null
      }
    </div>
    );
  }
  
  export default JobSeekersMatchFilter;