import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobOpenings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
          query: 'Software Engineer',
          page: currentPage.toString(),
          num_pages: '5',
          page_size: jobsPerPage.toString()
        },
        headers: {
          'X-RapidAPI-Key': '2aa82ec279msh7141ade418d3940p1a4d39jsnc16966fc5df2',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };

      try {
        setLoading(true);
        const response = await axios.request(options);
        setJobs(response.data.data);
        setTotalPages(5); // API typically returns 5 pages max
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="jobOpenings">
      <div className="container">
        <h3>Loading latest opportunities...</h3>
      </div>
    </div>
  );

  if (error) return (
    <div className="jobOpenings">
      <div className="container">
        <h3>{error}</h3>
      </div>
    </div>
  );

  return (
    <div className="jobOpenings">
      <div className="container">
        <h3>Latest Job Openings</h3>
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job.job_id} className="job-card">
              <h4>{job.job_title}</h4>
              <p><strong>Company:</strong> {job.employer_name}</p>
              <p><strong>Location:</strong> {job.job_city || job.job_country}</p>
              <p><strong>Type:</strong> {job.job_employment_type}</p>
              <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </div>
          ))}
        </div>
        
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobOpenings;