import JobSeekersSideBarList from "./JobSeekersSideBarList";
import {useDispatch, useSelector} from 'react-redux';

function JobSeekersMatchSidebar() {
  // const dispatch = useDispatch();
    return (
      <div className="JobSeekersMatchSidebar">
       <JobSeekersSideBarList />
      </div>
    );
  }
  
  export default JobSeekersMatchSidebar;