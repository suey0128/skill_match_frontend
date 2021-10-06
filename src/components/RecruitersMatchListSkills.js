
import Chip from '@mui/material/Chip';

function RecruitersMatchListSkills({skill}) {
    return (
          <Chip
          label={`${skill.name}, ${skill.level}`}
            size="small"
            style={{ color: "#fff"}}
            />
    );
  }
  
  export default RecruitersMatchListSkills;