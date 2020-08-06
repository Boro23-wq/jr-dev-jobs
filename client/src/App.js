import React from 'react';
import './App.css';

//components
import Jobs from './Jobs';

const JOB_API_URL = 'http://localhost:3001/jobs';

const mockJobs = [
  {
    title: 'SWE 1',
    company: 'Google',
  },
  {
    title: 'SWE 2',
    company: 'Apple',
  },
  {
    title: 'SWE 1',
    company: 'Facebook',
  },
];

async function fetchJobs(updateCB) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();

  updateCB(json);
}

function App() {
  const [jobsList, updateJobs] = React.useState([]);
  React.useEffect(() => {
    fetchJobs(updateJobs);
  }, []);

  return (
    <div className='App'>
      <Jobs jobs={jobsList} />
    </div>
  );
}

export default App;
