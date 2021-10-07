import {useDispatch, useSelector} from 'react-redux';
import {setEventListOnDisplay} from '../mainsSlice';
import Chip from '@mui/material/Chip';
import fetchPort from '../fetchPort';


function JobSeekersSideBarItem({matchingRecruiter}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);

  const onSideBarItemClick = () => {
    fetch(`${fetchPort}/job_seekers/${currentUser.id}`)
    .then(res => res.json())
    .then(data => {
      dispatch(setEventListOnDisplay(data.all_matching_events_for_front_end.filter(event => event.recruiter_id === matchingRecruiter.id)))
    })
    .catch(error => console.error('Error:', error))
  }


    return (
      <div className="job-seekers-side-bar-item">
        <div className="job-seekers-side-bar-content" onClick={onSideBarItemClick}>
            <img src={matchingRecruiter.logo} alt={matchingRecruiter.company_name} className="side-bar-logo"/>
            <h2>{matchingRecruiter.company_name}</h2>
            <p>{matchingRecruiter.name}</p>
            <p>{matchingRecruiter.email}</p>
            <p>{matchingRecruiter.location}</p>
        </div>

        <div className="job-seekers-side-bar-item-skills">
        {matchingRecruiter.skills.map((data) => 
          <Chip
            key={data.id}
            label={`${data.name}, ${data.level}`}
            size="small"
            style={{ color: "#fff"}}
            />
        )}
        </div>
      </div>
    );
  }
  
  export default JobSeekersSideBarItem;
