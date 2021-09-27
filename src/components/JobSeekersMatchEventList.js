import JobSeekersEventItem from "./JobSeekersMatchEventItem";

function JobSeekersMatchEventList({eventListOnDisplay, currentUser}) {
  // console.log("eventListOnDisplay:",eventListOnDisplay)
  return (
    <div className="match-event-list">
      {
        eventListOnDisplay.map(matchingEvent => 
        <JobSeekersEventItem key={matchingEvent.id}
                             matchingEvent={matchingEvent}
                             currentUser={currentUser}
        />)
      }
    </div>
  )
  }
  
  export default JobSeekersMatchEventList;

  //id, event-name, event-location, event-date, event-image, event-description
  //recruiter-name, recuiter-company-name