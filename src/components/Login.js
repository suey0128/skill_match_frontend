//Have to run the 2 command below to make the page show poperly on your browser 
//npm install @material-ui/core 
//npm install @material-ui/icons

//Material UI
import React, { useState }from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

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

 function Login({currentUser, setCurrentUser, setUserStatus, jobseekerArr, recruiterArr}) {
  const classes = useStyles();

  const history = useHistory();

  const [enterLoginUsername, setEnterLoginUsername] = useState("")
  const [enterLoginPD, setEnterLoginPD] = useState("")

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const isRecruiter = recruiterArr.find(r => r.username === enterLoginUsername && r.password === enterLoginPD) 
    const isJobSeeker = jobseekerArr.find(j => j.username === enterLoginUsername && j.password === enterLoginPD) 
    console.log(isRecruiter, isJobSeeker)
    
    if (isRecruiter) {
      //set userStatus
      setUserStatus("recruiter")
      //set currentUser
      setCurrentUser(isRecruiter)
      // console.log("currentUserInAppWhenRecruiterLogin", currentUser, "isRecruiter", isRecruiter)
    } else if (isJobSeeker) {
      setUserStatus("jobseeker")
      // console.log("isJobSeeker",isJobSeeker)
      setCurrentUser(isJobSeeker)
    } else {
      alert("Incorrect username or password, please re-enter.");
    }
    isJobSeeker || isRecruiter ? history.push("/matches") : console.log("incorrect login")
  }
  console.log(currentUser)
  // const redirectLogin = async () => {
    
  // }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleLoginSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e)=>{setEnterLoginUsername(e.target.value)}}
              value={enterLoginUsername}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>{setEnterLoginPD(e.target.value)}}
              value={enterLoginPD}
            />
            {/* <Link to="/matches" style={{color: 'inherit', textDecoration: 'none'}}> */}
              <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            {/* </Link> */}
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default Login;