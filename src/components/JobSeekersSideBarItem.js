import {useDispatch, useSelector} from 'react-redux';
import {setEventListOnDisplay} from '../mainsSlice';
import Chip from '@mui/material/Chip';


function JobSeekersSideBarItem({matchingRecruiter}) {
  const dispatch = useDispatch();
  const eventArr = useSelector(state => state.eventArr);

  const onSideBarItemClick = () => {
    dispatch(setEventListOnDisplay(eventArr.filter(event => event.recruiter_id == matchingRecruiter.id)))
  }

  // console.log(matchingRecruiter.skills)

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
          // <p>{`${data.name}, level${data.level}`}</p>
        )}
        </div>
      </div>
    );
  }
  
  export default JobSeekersSideBarItem;
