import RecruitersMatchList from "./RecruitersMatchList";
import {useSelector} from 'react-redux';

function RecruitersMatchContainer() {

  const currentUser = useSelector(state => state.currentUser)

    return (
      <div className="RecruitersMatchContainer">
        <div className="greeting-box">
          <h2>{`Hello, ${currentUser.name}`}</h2>
        </div>
        <div className="recruiters-match-seeker-h2">
          {currentUser.all_matching_job_seekers.length > 0 ? 
          <p>Here is your list of matching job seekers based on the skills you are looking for!</p>
          :
          <p>We don't currently have any matching job seeker for you based on the skills you are looking for, please check back later</p>
          }
       </div>
       <div className="recruiter-match-container">
        {currentUser.all_matching_job_seekers.map(matchingJobSeeker => 
          <RecruitersMatchList key={matchingJobSeeker.id}
                              matchingJobSeeker={matchingJobSeeker}
                              
          />)
        }
      </div>
      </div>
    );
  }
  
  export default RecruitersMatchContainer;