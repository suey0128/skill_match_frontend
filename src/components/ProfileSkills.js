import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {setUserSkills, setCurrentUser, setNeedFetchUser} from '../mainsSlice'
import TextField from '@material-ui/core/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles, createTheme } from '@material-ui/core/styles';
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

function ProfileSkills() {

    const dispatch = useDispatch();
    const userStatus = useSelector(state => state.userStatus)
    const currentUser = useSelector(state => state.currentUser)
    const userSkills = useSelector(state => state.userSkills)
    const needFetchUser = useSelector(state => state.needFetchUser)

    const [skillView, setSkillView] = useState("view") //"view", "add", "edit"
    const [skillName, setSkillName] = useState("")
    const [skillId, setSkillId] = useState(0)
    const [skillLevel, setSkillLevel] = useState(3)
 
    const classes = useStyles();

    useEffect(() => {
        currentUser.recruiters ? 
            fetch(`${fetchPort}/job_seekers/${currentUser.id}`)
            .then(res => res.json())
            .then(data => dispatch(setCurrentUser(data)))
            .catch(error => console.error('Error:', error))
        :
            fetch(`${fetchPort}/recruiters/${currentUser.id}`)
            .then(res => res.json())
            .then(data => dispatch(setCurrentUser(data)))
            .catch(error => console.error('Error:', error))

        if (currentUser === null) {
            return <h2>Loading...</h2> 
        } else { dispatch(setUserSkills(currentUser.skills)) }
    }, [])


    // delete from server - DONE!!
    const handleDelete = (skill_id) => {
        fetch(`${fetchPort}/skills/${skill_id}`, {
            method: "DELETE",
        })
        dispatch(setUserSkills(userSkills.filter(skill => skill.id !== skill_id)))
        // dispatch(setNeedFetchUser())
    }

    // edit form view - DONE!!
    const handleEdit = (skill_id, skill_name, skill_level) => {
        // console.log(skill_id)
        setSkillView("edit")
        setSkillId(skill_id)
        setSkillName(skill_name)
        setSkillLevel(skill_level)
    }

    // console.log(skillId, skillName, skillLevel)
    // patch to server - DONE!!
    const handleEditSave = (e) => {
        e.preventDefault()
        let updated_skill = {
            // id: skillId,
            profile_id: currentUser.profile_id,
            name: skillName, 
            level: parseInt(skillLevel)
        }
        fetch(`${fetchPort}/skills/${skillId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updated_skill)
        })
        .then(res => res.json())
        .then(data => 
            {
            // console.log(data);
            dispatch(setUserSkills(userSkills.map(skill => {
                if (skill.id === data.id) {
                    return {
                        id: data.id,
                        profile_id: data.profile_id,
                        name: data.name, 
                        level: data.level
                    }
                } else {
                    return skill
                }
            })));
            }
        )
        // dispatch(setNeedFetchUser())
        setSkillView("view")
    }
    
    const handleAdd = () => {
        setSkillView("add")
    }
    // form view + patch to server - DONE!!
    const handleAddSave = (e) => {
        e.preventDefault()  
        let new_skill = {
            name: skillName, 
            level: skillLevel,
            profile_id: currentUser.profile.id,
            // user_type: userStatus,
            // user_id: currentUser.id
        }

        fetch(`${fetchPort}/skills`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({skill: new_skill})
        })
        .then(res => res.json())
        .then(data => dispatch(setUserSkills([...userSkills, data])))
        // dispatch(setSkillChange(true))
        // dispatch(setNeedFetchUser())
        setSkillView("view")
        // console.log([...userSkills, new_skill])
    }


    return (
        <>
        {/* if view is view */}
        {skillView === "view"
        ? <div className="ProfileSkills">
            {userSkills.map((skill) =>
                (<span className="skills-details-box">
                    <h4>{skill.name}</h4> 
                    <h4>Level:</h4> 
                    <p>{skill.level}</p>
                    <button className="edit-skill" onClick={() => handleEdit(skill.id, skill.name, skill.level)}>
                        <EditIcon style={{fontSize: "18px"}}/>
                    </button>
                    <button className="delete-skill" onClick={() => handleDelete(skill.id)}>
                        <DeleteIcon style={{fontSize: "18px"}}/>
                    </button>
                </span>)
            )}
            <span className="skills-details-box">
                <button className="add-skill" onClick={() => handleAdd()}>
                    <AddIcon style={{fontSize: "18px"}}/>
                </button>
            </span>
        </div>
        : skillView === "add"
        // if view is add
        ? <div className="ProfileSkills">
            {/* form here */}
                <form className={classes.form} noValidate onSubmit={handleAddSave}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="skillname"
                    label="Skill Name: "
                    name="skillname"
                    autoFocus
                    onChange={(e)=>{setSkillName(e.target.value)}}
                    value={skillName}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="level"
                    label="Skill Level: "
                    type="level"
                    id="level"
                    onChange={(e)=>{setSkillLevel(e.target.value)}}
                    value={skillLevel}
                    />
                    <button className="add-save-skill">Add Skill</button>
                </form>
        </div>
        // if view is edit
        : 
        <div className="ProfileSkills">
            {/* form here */}
                <form className={classes.form} noValidate onSubmit={handleEditSave}>
                    {/* <h4>{`Editing: ${skillName}, Level: ${skillLevel}`}</h4> */}
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="skillname"
                    label="Skill Name: "
                    name="skillname"
                    autoFocus
                    onChange={(e)=>{setSkillName(e.target.value)}}
                    value={skillName}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="level"
                    label="Skill Level: "
                    type="level"
                    id="level"
                    value={skillLevel}
                    onChange={(e)=>{setSkillLevel(e.target.value)}}
                    />
                    <button className="edit-save-skill">Save Edit</button>
                </form>
        </div>
        }
        </>
    );
  }
  
  export default ProfileSkills;
