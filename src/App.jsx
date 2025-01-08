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
import JobOpenings from "./components/Job/JobOpenings";



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
        <Route path="/login" element={!isAuthorized ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthorized ? <Register /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthorized ? <Home /> : <Navigate to="/login" />} />
        <Route path="/job/getall" element={isAuthorized ? <Jobs /> : <Navigate to="/login" />} />
        <Route path="/job/:id" element={isAuthorized ? <JobDetails /> : <Navigate to="/login" />} />
        <Route path="/application/:id" element={isAuthorized ? <Application /> : <Navigate to="/login" />} />
        <Route path="/applications/me" element={isAuthorized ? <MyApplications /> : <Navigate to="/login" />} />
        <Route path="/job/post" element={isAuthorized ? <PostJob /> : <Navigate to="/login" />} />
        <Route path="/job/me" element={isAuthorized ? <MyJobs /> : <Navigate to="/login" />} />
        <Route path="/JobOpenings" element={isAuthorized ? <JobOpenings /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;