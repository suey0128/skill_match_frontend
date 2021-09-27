function JobSeekersMatchEventItem({matchingEvent, currentUser}) {
    console.log(matchingEvent)

    const addJobSeekerEvent = (jobseeker_id, event_obj) => {
      console.log(`jobseeker: ${jobseeker_id}, event: ${event_obj}`)
      fetch("http://localhost:3000/events", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: jobseeker_id,
              new_event: event_obj
            })
        })
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
              {/* <button className="add-event-js" onClick={addJobSeekerEvent(currentUser.id, matchingEvent)}>Add Event</button> */}
            </div>
        </li>
      </div>
    );
  }
  
  export default JobSeekersMatchEventItem;



