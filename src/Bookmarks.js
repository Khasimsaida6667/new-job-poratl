import React from 'react';
import { Link } from 'react-router-dom';
import './Bookmarks.css';

function Bookmarks({ bookmarks, removeBookmark }) {
  if (bookmarks.length === 0) {
    return <div className="no-bookmarks">No jobs bookmarked yet.</div>;
  }

  return (
    <div className="bookmarks">
      <h1>Bookmarked Jobs</h1>
      {bookmarks.map(job => (
        <div key={job.id} className="bookmark-card">
          <h2>{job.title}</h2>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <p>Phone: {job.phone}</p>
          <Link to={`/job/${job.id}`}>View Details</Link>
          <button className="remove-bookmark-btn" onClick={() => removeBookmark(job.id)}>Remove Bookmark</button>
        </div>
      ))}
    </div>
  );
}

export default Bookmarks;
