import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [candidates, setCandidates] = useState(null);

  // fetch the candidate API once on mount

  useEffect(() => {
    fetch("/candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data));
  }, []);


  function getTimeOff(date1, date2) {
    const lastDate = Date.parse(date2);
    const firstDate = Date.parse(date1);
   // return the difference
    const diffTime = Math.abs(lastDate - firstDate);
    // return days if less than a month, months if less than a year, years if more than a year
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // days
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30)); // months
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365)); // years
    if (diffDays === 1 || diffDays === 0) {
      return "no time off";
    }
    if (diffDays < 31) {
      return diffDays + " days";
    }
    else if (diffMonths < 12) {
      return diffMonths + " months";
    }
    else if (diffYears > 0) {
      return diffYears + " years";
    }
    else {
      return diffTime;
    }

  }

  return (
    // return the candidates array if it is not null
    <>
     <div style={{"overflow": "auto"}}>
      <ul>
        {candidates && candidates.map(candidate => <li key={candidate.id}>
          <div className="candidate">
            <h3>Hello {candidate.contact_info.name.formatted_name}</h3>
            <ul>{candidate.experience.length !== 0 ? candidate.experience.map((experience, index) => <li key={experience.company_name}>
              <h4>Worked as: {experience.title}</h4>
              From: {experience.start_date} To: {experience.end_date}
              <p>
                Time since previous job:
                { /** call getTimeOff if not the last item*/
                  index !== candidate.experience.length - 1 ? getTimeOff(experience.start_date, candidate.experience[index + 1].end_date) : "First job"} 
              </p>
            </li>) : "No experience"}
            </ul>
          </div>
        </li>)}
      </ul>
      </div>
    </>
  );
}

export default App;
