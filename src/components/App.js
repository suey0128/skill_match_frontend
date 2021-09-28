import '../App.css';
import { 
  BrowserRouter as Router,
  Switch, 
  Route
} from "react-router-dom";
import React, { useState, useEffect } from "react";

import SignUp from './SignUp';
import Login from './Login';
import Header from './Header';
import Homepage from './Homepage';
import JobSeekersMatchContainer from './JobSeekersMatchContainer';
import RecruitersMatchContainer from './RecruitersMatchContainer';
import ProfileContainer from './ProfileContainer';
import EventsContainer from './EventsContainer';


function App() {
  // CREATE STATE FOR THIS:
  const [userStatus, setUserStatus] = useState("none") //toggle among "none", "recruiter" and "jobseeker"
  const [currentUser, setCurrentUser] = useState(null)
  const [recruiterArr, setRecruiterArr] = useState([])
  const [jobseekerArr, setJobseekerArr] = useState([])
  const [skillChange, setSkillChange] = useState(false)
  const [eventArr, setEventArr] = useState([])
  const [pageChange, setPageChange] = useState(false)


  //fetch
  useEffect(()=>{
    fetch("http://localhost:3000/recruiters")
    .then(res => res.json())
    .then(recruiters => setRecruiterArr(recruiters) )
    .catch(error => console.error('Error:', error))
  },[])

  useEffect(()=>{
    fetch("http://localhost:3000/job_seekers")
    .then(res => res.json())
    .then(jobseekers => {
      setJobseekerArr(jobseekers) 
      //hardcoding currentUser as jobseeker id 1
      setCurrentUser(jobseekers.filter(js => js.id === 1))
      setUserStatus("jobseeker")
    })
    .catch(error => console.error('Error:', error))
  },[])

  useEffect(()=>{
    fetch("http://localhost:3000/events")
    .then(res => res.json())
    .then(events => setEventArr(events) )
    .catch(error => console.error('Error:', error))
  },[])

 

  const onHeaderButtonClick = () => {
      setCurrentUser(null)
  }

  const onUserEventsUpdate = (bool) => {
    if (bool) {
      console.log(true)
    }
  }

  const onSkillChange = (bool) => {
    // console.log(bool)
    if (bool) {
      console.log(true) 
    }
  }


  return (
    <div className="App">
      <Router>
        {/* <button onClick={history.push("/")}>yo</button> */}
        <Header currentUser={currentUser}
                setUserStatus={setUserStatus}
                setCurrentUser={onHeaderButtonClick}/>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/signup">
            <SignUp userStatus={userStatus} 
                    setUserStatus={setUserStatus} 
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    />
          </Route>
          <Route path="/login">
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} setUserStatus={setUserStatus} jobseekerArr={jobseekerArr} recruiterArr={recruiterArr}/>
          </Route>
          <Route path="/matches">
            {userStatus === "recruiter" ? 
              <RecruitersMatchContainer currentUser={currentUser}/> 
              : 
              <JobSeekersMatchContainer currentUser={currentUser} 
                                        eventArr={eventArr}/>}
          </Route>
          <Route path="/profile">
            <ProfileContainer userStatus={userStatus}
                              currentUser={currentUser}
                              recruiterArr={recruiterArr}
                              jobseekerArr={jobseekerArr}
                              setSkillChange={onSkillChange}/>
          </Route>
          <Route path="/events">
            <EventsContainer userStatus={userStatus}
                              currentUser={currentUser}
                              recruiterArr={recruiterArr}
                              jobseekerArr={jobseekerArr}
                              updateUserEvents={onUserEventsUpdate}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
