import '../App.css';
import { 
  BrowserRouter as Router,
  Switch, 
  Route
} from "react-router-dom";
import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { setRecruiterArr, setJobseekerArr, setEventArr } from '../mainsSlice';

import SignUp from './SignUp';
import Login from './Login';
import Header from './Header';
import Homepage from './Homepage';
import JobSeekersMatchContainer from './JobSeekersMatchContainer';
import RecruitersMatchContainer from './RecruitersMatchContainer';
import ProfileContainer from './ProfileContainer';
import EventsContainer from './EventsContainer';
import Footer from './Footer';


function App() {
  const dispatch = useDispatch();
  // dispatch(setUserState(user)) => change state
  const userStatus = useSelector(state => state.userStatus)
  const currentUser = useSelector(state => state.currentUser)


  //fetch
  useEffect(()=>{
    fetch("http://localhost:3000/recruiters")
    .then(res => res.json())
    .then(recruiters => dispatch(setRecruiterArr(recruiters)))
    .catch(error => console.error('Error:', error))
  },[])

  useEffect(()=>{
    fetch("http://localhost:3000/job_seekers")
    .then(res => res.json())
    .then(jobseekers => {
      dispatch(setJobseekerArr(jobseekers))
      //hardcoding currentUser as jobseeker id 1
      // setCurrentUser(jobseekers.filter(js => js.id === 1))
      // setUserStatus("jobseeker")
    })
    .catch(error => console.error('Error:', error))
  },[])

  useEffect(()=>{
    fetch("http://localhost:3000/events")
    .then(res => res.json())
    .then(events => dispatch(setEventArr(events)))
    .catch(error => console.error('Error:', error))
  },[])

  return (
    <div className="App">
     { currentUser ? 
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/matches">
            {userStatus === "recruiter" ? 
              <RecruitersMatchContainer /> 
              : 
              <JobSeekersMatchContainer />}
          </Route>
          <Route path="/profile">
            <ProfileContainer />
          </Route>
          <Route path="/events">
            <EventsContainer />
          </Route>
        </Switch>
      </Router>
      : 
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
      }

      <Footer />
    </div>
  );
}

export default App;
