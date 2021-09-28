import React from "react";
import {useSelector} from 'react-redux';
import SignUpRecruiter from "./SignUpRecruiter"
import SignUpJobSeeker from "./SignUpJobSeeker"
import SignUpInstructions from "./SignUpInstructions"



function SignUp() {
  const userStatus = useSelector(state => state.userStatus)

    if (userStatus === "none") {
      return <SignUpInstructions />;
    } else if (userStatus === "recruiter") {
      return <SignUpRecruiter />;
    } else {
      return <SignUpJobSeeker />;
    }
}

export default SignUp;
