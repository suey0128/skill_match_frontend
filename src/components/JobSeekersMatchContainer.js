import React from 'react'
import {useSelector} from 'react-redux';
import JobSeekersMatchSidebar from "./JobSeekersMatchSidebar";
import JobSeekersMatchFilter from "./JobSeekersMatchFilter";
import JobSeekersMatchEventList from "./JobSeekersMatchEventList";
import JobSeekersMatchSidebarMobile from "./JobSeekersMatchSidebarMobile";
import JobSeekersMatchMobileRecruiterInfo from "./JobSeekersMatchMobileRecruiterInfo";

function JobSeekersMatchContainer() {
  const currentUser = useSelector(state => state.currentUser);
  const showMobileRecruiterInfo = useSelector(state => state.showMobileRecruiterInfo);
  
    return (
      <div className="JobSeekersMatchContainer">
        <div className="greeting-box">
          <h2>{`Hello, ${currentUser.name}`}</h2>
        </div>
        <JobSeekersMatchFilter />
        <JobSeekersMatchSidebarMobile />
        
        {showMobileRecruiterInfo ? 
          <JobSeekersMatchMobileRecruiterInfo /> : null
        }
        <div className="match-page-container">
          <JobSeekersMatchSidebar />
          <JobSeekersMatchEventList />
        </div>
      </div>
    );
  }
  
  export default JobSeekersMatchContainer;