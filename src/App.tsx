import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import JobBoardPage from "./pages/job-board";
import PageNotFound from "./pages/not-found";

function App() {
  return (
    <div className="bg-[#323242] text-global-text">
      <h2 className="text-3xl font-bold">Job board App</h2>

      <BrowserRouter>
        <Routes>
          <Route path="/jobs" element={<JobBoardPage />} />
          <Route path="/" element={<HomePage />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
