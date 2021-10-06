import RecruitersMatchListSkills from "./RecruitersMatchListSkills";

function RecruitersMatchList({matchingJobSeeker}) {
    return (
      <div className="recruiter-match-item">
          <div className="matching-job-seeker-info">
            <img className="matching-job-seeker-photo" src={matchingJobSeeker.image} alt={matchingJobSeeker.name} />
            <h2>{matchingJobSeeker.name}</h2>
            <p>location: {matchingJobSeeker.location}</p>
            <p id="matching-job-seeker-p">email: {matchingJobSeeker.email}</p>
            {matchingJobSeeker.skills.map(skill =>
          < RecruitersMatchListSkills  key={skill.id}  skill={skill}/>
          )}
          </div>
      </div>
    );
  }
  
  export default RecruitersMatchList;

  