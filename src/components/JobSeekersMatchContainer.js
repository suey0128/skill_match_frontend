import React, {useState}from 'react'
import {useSelector} from 'react-redux';
import JobSeekersMatchSidebar from "./JobSeekersMatchSidebar";
import JobSeekersMatchFilter from "./JobSeekersMatchFilter";
import JobSeekersMatchEventList from "./JobSeekersMatchEventList";
import JobSeekersMatchSidebarMobile from "./JobSeekersMatchSidebarMobile";

function JobSeekersMatchContainer() {
  const currentUser = useSelector(state => state.currentUser)
  
  // need to use useEffect to fetch events from currentUser 

  // console.log(eventListOnDisplay)
    return (
      <div className="JobSeekersMatchContainer">
        <div className="greeting-box">
          <h2>{`Hello, ${currentUser.name}`}</h2>
        </div>
        <JobSeekersMatchFilter />

        <JobSeekersMatchSidebarMobile />

        <div className="match-page-container">
          <JobSeekersMatchSidebar />
          <JobSeekersMatchEventList />
        </div>
      </div>
    );
  }
  
  export default JobSeekersMatchContainer;