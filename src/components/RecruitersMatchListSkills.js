import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

function RecruitersMatchListSkills({skill}) {
    console.log(skill)
    return (
      // <div className="RecruitersMatchListSkills">
          <Chip
          label={`${skill.name}, ${skill.level}`}
            size="small"
            style={{ color: "#fff"}}
            />
      // </div>
    );
  }
  
  export default RecruitersMatchListSkills;