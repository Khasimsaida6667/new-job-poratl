import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './JobDetails.css';

function JobDetails() {
  const { id } = useParams();
  const [jb, setJb] = useState(null);
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoad(true);
      setErr(null);
      try {
        const resp = await axios.get(`https://testapi.getlokalapp.com/common/jobs/${id}`);
        setJb(resp.data);
      } catch (error) {
        setErr('Failed to fetch job details. Please try again.');
      }
      setLoad(false);
    };

    fetchJobDetails();
  }, [id]);

  if (load) {
    return <div className="loading">Loading...</div>;
  }

  if (err) {
    return <div className="error">{err}</div>;
  }

  if (!jb) {
    return <div className="not-found">Job not found</div>;
  }

  return (
    <div className="job-details">
      <h1>{jb.title}</h1>
      <p><strong>Location:</strong> {jb.primary_details.Place}</p>
      <p><strong>Salary:</strong> {jb.primary_details.Salary !== "-" ? jb.primary_details.Salary : "Not specified"}</p>
      <p><strong>Job Type:</strong> {jb.primary_details.Job_Type}</p>
      <p><strong>Experience:</strong> {jb.primary_details.Experience}</p>
      <p><strong>Qualification:</strong> {jb.primary_details.Qualification}</p>
      <p><strong>Company:</strong> {jb.company_name}</p>
      {jb.job_tags && (
        <div className="job-tags">
          <strong>Tags:</strong>
          {jb.job_tags.map((tag, idx) => (
            <span key={idx} className="job-tag" style={{backgroundColor: tag.bg_color, color: tag.text_color}}>
              {tag.value}
            </span>
          ))}
        </div>
      )}
      {jb.contentV3 && jb.contentV3.V3 && (
        <div className="additional-details">
          <h2>Additional Details</h2>
          {jb.contentV3.V3.map((item, idx) => (
            <p key={idx}><strong>{item.field_name}:</strong> {item.field_value}</p>
          ))}
        </div>
      )}
      {jb.other_details && <p><strong>Other Details:</strong> {jb.other_details}</p>}
    </div>
  );
}

export default JobDetails;
