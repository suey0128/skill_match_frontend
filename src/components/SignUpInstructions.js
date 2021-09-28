import React from "react";
import {useDispatch} from 'react-redux';
import { setUserStatus } from '../mainsSlice';


function SignUpInstructions() {
  const dispatch = useDispatch();

    return (
      <div className="sign-up-instructions-contianer">
        <h2 className="sign-up-header">Please select your signup</h2>
        <button className="sign-up-choice-btn" onClick={(e)=>dispatch(setUserStatus("jobseeker"))}>I'm a job seeker</button>
        <button className="sign-up-choice-btn" onClick={(e)=>dispatch(setUserStatus("recruiter"))}>I'm a recruiter</button>
      </div>
    )
  }
  
  export default SignUpInstructions;