import RecruitersMatchList from "./RecruitersMatchList";
import {useSelector} from 'react-redux';

function RecruitersMatchContainer() {

  const currentUser = useSelector(state => state.currentUser)
  // console.log("currentUserInRecruiterMatchContainer", currentUser)
    return (
      <div className="RecruitersMatchContainer">
        <div className="greeting-box">
          <h2>{`Hello, ${currentUser.name}`}</h2>
        </div>
        <div className="recruiters-match-seeker-h2">
          <h2>Here is your list of matching job seekers based on the skills you are looking for!</h2>
       </div>
       <ul >
        {
          currentUser.all_matching_job_seekers.map(matchingJobSeeker => 
          <RecruitersMatchList key={matchingJobSeeker.id}
                              matchingJobSeeker={matchingJobSeeker}
                              
          />)
        }
      </ul>
      </div>
    );
  }
  
  export default RecruitersMatchContainer;