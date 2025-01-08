import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { RiAiGenerate } from 'react-icons/ri'; // Add this import
const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How HireSphere Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Sign up as a job seeker or employer. Complete your profile 
                with relevant skills, experience, and preferences to get started.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Browse thousands of job listings or post your job requirements. 
                Our smart matching system helps connect the right talent with the right opportunities.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                Apply with just one click or review applications from qualified candidates. 
                Connect directly and make informed hiring decisions.
              </p>
            </div>
            <div className="card">
              <RiAiGenerate />
              <p>Practice with AI Mock Interviews</p>
              <p>
                Prepare for real interviews with our AI-powered mock interview system. 
                Get instant feedback on your responses and improve your interview skills 
                with industry-specific questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;