import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import PostDetails from "./components/PostDetails";
import './App.css';
import DirectMessages from "./components/DirectMessages";

const App = () => (
  <Router>
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Navbar />

      {/* Main Content Section */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        {/* This will be empty for now but can be filled later */}
        <DirectMessages/>
      </div>
    </div>
  </Router>
);

export default App;
