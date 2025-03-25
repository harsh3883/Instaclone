import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import PostDetails from "./components/PostDetails";
import './App.css';
import DirectMessages from "./components/DirectMessages";
import SearchPage from './components/SearchPage'
import Create from "./components/Create";

const App = () => (
  <Router>
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Navbar />

      {/* Main Content Section */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/create" element={<Create />}/>
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/search/:id" element={<PostDetails />} />
        </Routes>
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <DirectMessages/>
      </div>
    </div>
  </Router>
);

export default App;
