import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './JobDetails.css';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs/${id}`);
        console.log(response.data);  // Log response to inspect the data structure
        setJob(response.data);
      } catch (err) {
        setError('Failed to fetch job details. Please try again.');
      }
      setIsLoading(false);
    };

    fetchJobDetails();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!job) {
    return <div className="not-found">Job not found</div>;
  }

  return (
    <div className="job-details">
      <h1>{job.title}</h1>
      <p><strong>Location:</strong> {job.primary_details?.Place || "Not specified"}</p>
      <p><strong>Salary:</strong> {job.primary_details?.Salary && job.primary_details.Salary !== "-" ? job.primary_details.Salary : "Not specified"}</p>
      <p><strong>Job Type:</strong> {job.primary_details?.Job_Type || "Not specified"}</p>
      <p><strong>Experience:</strong> {job.primary_details?.Experience || "Not specified"}</p>
      <p><strong>Qualification:</strong> {job.primary_details?.Qualification || "Not specified"}</p>
      <p><strong>Company:</strong> {job.company_name}</p>

      {job.job_tags && (
        <div className="job-tags">
          <strong>Tags:</strong>
          {job.job_tags.map((tag, index) => (
            <span key={index} className="job-tag" style={{ backgroundColor: tag.bg_color, color: tag.text_color }}>
              {tag.value}
            </span>
          ))}
        </div>
      )}

      {job.contentV3?.V3 && (
        <div className="additional-details">
          <h2>Additional Details</h2>
          {job.contentV3.V3.map((item, index) => (
            <p key={index}><strong>{item.field_name}:</strong> {item.field_value || "Not specified"}</p>
          ))}
        </div>
      )}

      {job.other_details && <p><strong>Other Details:</strong> {job.other_details}</p>}
    </div>
  );
}

export default JobDetails;
