import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import {useDispatch, useSelector} from 'react-redux';
import {setEventListOnDisplay, setShowMobileRecruiterInfo} from '../mainsSlice';

const JobSeekersMatchSidebarMobile = () => {
    const dispatch = useDispatch();
    const eventArr = useSelector(state => state.eventArr);
    const currentUser = useSelector(state => state.currentUser);
  
    const handleClick = (matchingRecruiter) => {
      dispatch(setEventListOnDisplay(eventArr.filter(event => event.recruiter_id == matchingRecruiter.id)))
      dispatch(setShowMobileRecruiterInfo(matchingRecruiter))
    }

    return (
        <div className="JobSeekersMatchSidebarMobile">
            <Stack direction="row" spacing={1} >
                {currentUser.all_matching_recruiters_with_skills.map((matchingRecruiter) => 
                <Chip label={matchingRecruiter.company_name} 
                        variant="outlined" 
                        onClick={()=>{handleClick(matchingRecruiter)}} 
                        key={matchingRecruiter.id} 
                        />
                )}
            
            </Stack>
        </div>
    )
}

export default JobSeekersMatchSidebarMobile
