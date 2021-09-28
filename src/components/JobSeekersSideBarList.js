import JobSeekersSideBarItem from "./JobSeekersSideBarItem";
import {useDispatch, useSelector} from 'react-redux';

function JobSeekersSideBarList() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser)
    // console.log("currentUserInSideBarList", currentUser)
    return (
      <div className="job-seekers-side-bar-list">
        <ul>
            {currentUser.all_matching_recruiters.map((matchingRecruiter) => 
              <JobSeekersSideBarItem key={matchingRecruiter.id} matchingRecruiter={matchingRecruiter}/>
            )}
        </ul>
      </div>
    );
  }
  
  export default JobSeekersSideBarList;
