import ProfileSkills from "./ProfileSkills";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {setViewProfile, setCurrentUser, setNeedFetchUser} from '../mainsSlice';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#94aac4',
      }
    },
  });
  
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function ProfileContainer() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const currentUser = useSelector(state => state.currentUser)
    const viewProfile = useSelector(state => state.viewProfile) 

    //for the control form
    const [name, setName] = useState(currentUser.name)
    const [location, setLocation] = useState(currentUser.location)
    const [username, setUsername] = useState(currentUser.username)
    const [password, setPassword] = useState(currentUser.password)
    const [email, setEmail] = useState(currentUser.email)

    const handleSubmit = (e) => {
        e.preventDefault();
        let newProfileInfo = {};
        let js= {newUser: {
            name,
            location,
            username,
            password,
            email
            }};
        let r = {
            name,
            location,
            username,
            password,
            email
            };

        let userType;
        if (currentUser.job_seekers) {
            userType = "recruiters"
            newProfileInfo = r
        } else { 
            userType = "job_seekers"
            newProfileInfo = js
        }

        // console.log(newProfileInfo, userType)
        //Patch
        fetch(`http://localhost:3000/${userType}/${currentUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProfileInfo)
        })
        .then(res => res.json())
        .then(data => {
            dispatch(setNeedFetchUser())
            dispatch(setViewProfile(true))
        })
        
    }

    return (
 
        <div className="profile-container">
            <div className="greeting-box">
                <h2>{`Hello, ${currentUser.name}`}</h2>
            </div>
            
            {viewProfile ? 
                <div className="profile-content">
                    
                    <div className="user-details">
                        <h2>User Details</h2>
                        <div className="details-container">
                            <span className="user-details-text-box">
                                <h4>Name:</h4>
                                <p>{currentUser.name}</p>
                            </span>
                            <span className="user-details-text-box">
                                <h4>Location:</h4>
                                <p>{currentUser.location}</p>
                            </span>
                            <span className="user-details-text-box">
                                <h4>Username:</h4>
                                <p>{currentUser.username}</p>
                            </span>
                            <span className="user-details-text-box">
                                <h4>Password:</h4>
                                <p>{currentUser.password}</p>
                            </span>
                            <span className="user-details-text-box">
                                <h4>Email:</h4>
                                <p>{currentUser.email}</p>
                            </span>
                        </div>
                        <span className="user-details-text-box">
                            <button className="edit-profile" onClick={()=>dispatch(setViewProfile(false))}>Edit Profile</button>
                        </span>
                    </div>

                    <div className="skills-container">
                        <h2>Skills</h2>
                            <ProfileSkills />
                    </div>
                </div>
            :
            <div className="profile-content">
                <form className={classes.form} noValidate onSubmit={(e)=>{handleSubmit(e)}}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name: "
                    name="name"
                    autoFocus
                    onChange={(e)=>{setName(e.target.value)}}
                    value={name}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="location"
                    label="Location: "
                    type="location"
                    id="location"
                    onChange={(e)=>{setLocation(e.target.value)}}
                    value={location}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="Username: "
                    type="username"
                    id="username"
                    onChange={(e)=>{setUsername(e.target.value)}}
                    value={username}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password: "
                    type="password"
                    id="password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                    value={password}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email: "
                    type="email"
                    id="email"
                    onChange={(e)=>{setEmail(e.target.value)}}
                    value={email}
                    />
                    <button className="save-change-btn">Save Change</button>
                </form>
            </div>
            }
        </div>
    );
  }
  
  export default ProfileContainer;