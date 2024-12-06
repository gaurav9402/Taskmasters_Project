import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import About from "./pages/About";
import ViewTasks from "./pages/ViewTasks";
import EditTask from "./pages/EditTask";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks" element={<ViewTasks />} />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
      </Routes>
    </div>
  );
};

export default App;
