import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Jobs from './Jobs';
import Bookmarks from './Bookmarks';
import JobDetails from './JobDetails';
import './App.css';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      {children}
    </Link>
  );
}

function App() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(storedBookmarks);
  }, []);

  const addBookmark = (job) => {
    const updatedBookmarks = [...bookmarks, job];
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  const removeBookmark = (jobId) => {
    const updatedBookmarks = bookmarks.filter(job => job.id !== jobId);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Jobs addBookmark={addBookmark} />} />
          <Route path="/bookmarks" element={<Bookmarks bookmarks={bookmarks} removeBookmark={removeBookmark} />} />
          <Route path="/job/:id" element={<JobDetails />} />
        </Routes>
        <nav className="bottom-nav">
          <NavLink to="/">Jobs</NavLink>
          <NavLink to="/bookmarks">Bookmarks</NavLink>
        </nav>
      </div>
    </Router>
  );
}

export default App;