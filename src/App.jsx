import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Context } from "./main";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import MyJobs from "./components/Job/MyJobs";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NotFound from "./components/NotFound/NotFound";
import JobOpenings from "./components/Home/JobOpenings";



const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Check if token exists
        if (!token) {
          setIsAuthorized(false);
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://hire-sphere-backend.vercel.app/api/v1/user/getuser",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/applications/me" element={<MyApplications />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/job/me" element={<MyJobs />} />
         <Route path="/JobOpenings" element={<JobOpenings/>} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;