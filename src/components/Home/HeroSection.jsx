import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "25,000+",
      subTitle: "Active Jobs",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "10,000+",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "50,000+",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "15,000+",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
          
            <h1>Discover Your Next</h1>
            <h1>Career Opportunity</h1>
            <p>
              Join HireSphere to connect with leading companies and find the perfect job 
              match for your skills. Whether you're starting your career or seeking growth, 
              we're here to help you succeed.
            </p>
          </div>
          <div className="image">
            <img src="/Hire1.png" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;