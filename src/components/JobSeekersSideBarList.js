import JobSeekersSideBarItem from "./JobSeekersSideBarItem";
import {useSelector} from 'react-redux';

function JobSeekersSideBarList() {
  const currentUser = useSelector(state => state.currentUser)
  const eventListOnDisplay = useSelector(state => state.eventListOnDisplay)

    return (
      <div className="job-seekers-side-bar-list">
        <ul>
            {currentUser.all_matching_recruiters_with_skills.map((matchingRecruiter) => 
              <JobSeekersSideBarItem key={matchingRecruiter.id} matchingRecruiter={matchingRecruiter}/>
            )}
        </ul>
      </div>
    );
  }
  
  export default JobSeekersSideBarList;
