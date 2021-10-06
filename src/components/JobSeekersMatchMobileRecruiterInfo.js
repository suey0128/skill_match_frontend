import React from 'react';
import {useSelector} from 'react-redux';
import Chip from '@mui/material/Chip';

const JobSeekersMatchMobileRecruiterInfo = () => {
    const showMobileRecruiterInfo = useSelector(state => state.showMobileRecruiterInfo)

    return (

    <div className="job-seekers-mobile-recruiter-info">
        <div className="job-seekers-side-bar-content" >
            <img src={showMobileRecruiterInfo.logo} alt={showMobileRecruiterInfo.company_name} className="side-bar-logo"/>
            <h2>{showMobileRecruiterInfo.company_name}</h2>
            <p>{showMobileRecruiterInfo.name}</p>
            <p>{showMobileRecruiterInfo.email}</p>
            <p>{showMobileRecruiterInfo.location}</p>
        </div>

        <div className="job-seekers-side-bar-item-skills">
        {showMobileRecruiterInfo.skills.map((data) => 
        <Chip
            key={data.id}
            label={`${data.name}, ${data.level}`}
            size="small"
            style={{ color: "rgb(128, 128, 128)"}}
            />
        )}
        </div>
    </div>

    )
}

export default JobSeekersMatchMobileRecruiterInfo
