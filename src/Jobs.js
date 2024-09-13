import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Jobs.css';

function Jobs({ addBookmark }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = async () => {
    if (!hasMore) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      
    
      console.log(response.data); 

      if (response.data && Array.isArray(response.data.results)) {
        if (response.data.results.length === 0) {
          setHasMore(false);
        } else {
          setJobs(prevJobs => [...prevJobs, ...response.data.results]);
          setPage(prevPage => prevPage + 1);
        }
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="jobs">
      <h1>Available Jobs</h1>
      {jobs.map(job => (
        <div key={job.id} className="job-card">
          <h2>{job.title}</h2>
          <p>Company: {job.company_name}</p>
          <p>Location: {job.primary_details?.Place || "Not specified"}</p>
          <p>Salary: {job.primary_details?.Salary && job.primary_details.Salary !== "-" ? job.primary_details.Salary : "Not specified"}</p>
          <p>Job Type: {job.primary_details?.Job_Type || "Not specified"}</p>
          <p>Experience: {job.primary_details?.Experience || "Not specified"}</p>
          <p>Qualification: {job.primary_details?.Qualification || "Not specified"}</p>

          {job.job_tags && job.job_tags.map((tag, index) => (
            <span key={index} className="job-tag" style={{ backgroundColor: tag.bg_color, color: tag.text_color }}>
              {tag.value}
            </span>
          ))}
          
          <Link to={`/job/${job.id}`}>View Details</Link>
          <button className="bookmark-btn" onClick={() => addBookmark(job)}>Bookmark</button> 
        </div>
      ))}

      {isLoading && <div className="loading">Loading...</div>}
      {!isLoading && hasMore && (
        <button onClick={fetchJobs} className="load-more">Load More</button>
      )}
      {!isLoading && !hasMore && jobs.length === 0 && <div className="no-jobs">No jobs available</div>}
    </div>
  );
}

export default Jobs;

