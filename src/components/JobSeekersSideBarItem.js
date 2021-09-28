import {useDispatch, useSelector} from 'react-redux';
import {setEventListOnDisplay} from '../mainsSlice';

function JobSeekersSideBarItem({matchingRecruiter}) {
  const dispatch = useDispatch();
  const eventArr = useSelector(state => state.eventArr);

  const onSideBarItemClick = () => {
    // console.log("matching_recruiterInMatchContainer",matchingRecruiter.id)
    //setSelectedRecruiterEvent true => show flitered arry
    //filter the eventArr with matchingRecruiter 
    dispatch(setEventListOnDisplay(eventArr.filter(event => event.recruiter_id == matchingRecruiter.id)))
  }
    return (
      <div className="job-seekers-side-bar-item">
        <li onClick={onSideBarItemClick}>
            <img src={matchingRecruiter.logo} alt={matchingRecruiter.company_name} className="side-bar-logo"/>
            <h2>{matchingRecruiter.company_name}</h2>
            <p>{matchingRecruiter.name}</p>
            <p>{matchingRecruiter.email}</p>
            <p>{matchingRecruiter.location}</p>
        </li>
      </div>
    );
  }
  
  export default JobSeekersSideBarItem;
