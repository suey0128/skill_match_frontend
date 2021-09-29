import {createSlice} from '@reduxjs/toolkit';

// Async actions


// Reducer
const mainsSlice = createSlice({
    name: "auth",
    initialState: {
        userStatus: "none",
        currentUser: null,
        recruiterArr: [],
        jobseekerArr: [],
        skillset: false,
        eventArr: [],
        pageset: false,
        eventListOnDisplay: [],
        showPassword: false,
        userSkills: [],
        userEvents: [],
        needFetchUser: false,
    },
    reducers: {
        setUserStatus(state, action) {
            state.userStatus = action.payload
        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        },
        setRecruiterArr(state, action) {
            state.recruiterArr = action.payload
        },
        setJobseekerArr(state, action) {
            state.jobseekerArr = action.payload
        },
        setSkillset(state, action) {
            state.skillset = action.payload
        },
        setEventArr(state, action) {
            state.eventArr = action.payload
        },
        setPageset(state, action) {
            state.pageset = action.payload
        },
        setEventListOnDisplay(state, action) {
            state.eventListOnDisplay = action.payload
        },
        setShowPassword(state, action) {
            state.showPassword = action.payload
        },
        setUserSkills(state, action) {
            state.userSkills = action.payload
        },
        setUserEvents(state, action) {
            state.userEvents = action.payload
        },
        setNeedFetchUser(state) {
            state.needFetchUser = !(state.needFetchUser)
        },
    }
})

// Actions
const {
    setUserStatus,
    setCurrentUser,
    setRecruiterArr,
    setJobseekerArr,
    setSkillset,
    setEventArr,
    setPageset,
    setEventListOnDisplay,
    setShowPassword,
    setUserSkills,
    setUserEvents,
    setNeedFetchUser
} = mainsSlice.actions;

// Exports

export {
    setUserStatus,
    setCurrentUser,
    setRecruiterArr,
    setJobseekerArr,
    setSkillset,
    setEventArr,
    setPageset,
    setEventListOnDisplay,
    setShowPassword,
    setUserSkills,
    setUserEvents,
    setNeedFetchUser
}

export default mainsSlice.reducer;