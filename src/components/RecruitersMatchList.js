import RecruitersMatchListSkills from "./RecruitersMatchListSkills";
// import {useDispatch, useSelector} from 'react-redux';

function RecruitersMatchList({matchingJobSeeker}) {
  console.log("matchingJobSeeker", matchingJobSeeker)
    return (
      <div >
       <li className="RecruitersMatchList">
         <div className="matching-job-seeker-photo">
            <img src={matchingJobSeeker.image} alt={matchingJobSeeker.name} />
          </div>
          <div className="matching-job-seeker-info">
            <h2>{matchingJobSeeker.name}</h2>
            <p>location: {matchingJobSeeker.location}</p>
            <p id="matching-job-seeker-p">email: {matchingJobSeeker.email}</p>
            {matchingJobSeeker.skills.map(skill =>
          < RecruitersMatchListSkills  key={skill.id}  skill={skill}/>
          )}
          </div>
        </li>
      </div>
    );
  }
  
  export default RecruitersMatchList;

  