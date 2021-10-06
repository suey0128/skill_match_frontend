//Have to run the 2 command below to make the page show poperly on your browser 
//npm install @material-ui/core 
//npm install @material-ui/icons

import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setUserStatus, setCurrentUser } from '../mainsSlice';
import {useHistory} from 'react-router-dom';
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
import fetchPort from '../fetchPort';

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

 function SignUpRecruiter() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history= useHistory();

  const [enterSignUpUsername, setEnterSignUpUsername] = useState("")
  const [enterSignUpEmail, setEnterSignUpEmail] = useState("")
  const [enterSignUpName, setEnterSignUpName] = useState("")
  const [enterSignUpCompanyName, setEnterSignUpCompanyName] = useState("")
  const [enterSignUpLocation, setEnterSignUpLocation] = useState("")
  const [enterSignUpPD, setEnterSignUpPD] = useState("")
  const [enterSignUpLogo, setEnterSignUpLogo] = useState("")

  const handleRecruiterSignUp = (e) => {
    e.preventDefault();
    fetch(`${fetchPort}/recruiters`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name: enterSignUpName,  
        company_name: enterSignUpCompanyName, 
        username: enterSignUpUsername, 
        location: enterSignUpLocation, 
        password: enterSignUpPD, 
        email: enterSignUpEmail, 
        logo: enterSignUpLogo 
      })
      })
      .then(res => res.json())
      .then(data => {
        dispatch(setCurrentUser(data))
        dispatch(setUserStatus("recruiter"))
        history.push("/profile")
      })
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleRecruiterSignUp}>
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
              onChange={(e)=>{setEnterSignUpUsername(e.target.value)}}
              value={enterSignUpUsername}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>{setEnterSignUpEmail(e.target.value)}}
              value={enterSignUpEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e)=>{setEnterSignUpName(e.target.value)}}
              value={enterSignUpName}
            /> 
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="company_name"
              label="Company Name"
              name="company_name"
              autoComplete="company_name"
              autoFocus
              onChange={(e)=>{setEnterSignUpCompanyName(e.target.value)}}
              value={enterSignUpCompanyName}
            />           
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              autoComplete="location"
              autoFocus
              onChange={(e)=>{setEnterSignUpLocation(e.target.value)}}
              value={enterSignUpLocation}
            />
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="logo"
              label="Logo Url"
              name="logo"
              autoComplete="logo"
              autoFocus
              onChange={(e)=>{setEnterSignUpLogo(e.target.value)}}
              value={enterSignUpLogo} 
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
              onChange={(e)=>{setEnterSignUpPD(e.target.value)}}
              value={enterSignUpPD}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2" onClick={(e)=>dispatch(setUserStatus("jobseeker"))}>
                  {"Job seeker signup"}
                </Link>
              </Grid>

              <Grid item xs>
                <Link href="/login" variant="body2">
                  {"Have an account? Login"}
                </Link>
              </Grid>

            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpRecruiter;