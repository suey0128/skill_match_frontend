import {useDispatch, useSelector} from 'react-redux';
import {setEventListOnDisplay} from '../mainsSlice';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function JobSeekersSideBarItem({matchingRecruiter}) {
  const dispatch = useDispatch();
  const eventArr = useSelector(state => state.eventArr);

  const onSideBarItemClick = () => {
    dispatch(setEventListOnDisplay(eventArr.filter(event => event.recruiter_id == matchingRecruiter.id)))
  }

  console.log(matchingRecruiter.skills)

    return (
      <div className="job-seekers-side-bar-item">
        <div onClick={onSideBarItemClick}>
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
