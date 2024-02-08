import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav-bar";
import HomePage from "./pages";
import BookmarksPage from "./pages/bookmarks";
import JobBoardPage from "./pages/job-board";
import PageNotFound from "./pages/not-found";

function App() {
  return (
    <div className="">
      {/* <h2 className="text-3xl font-bold">Job board App</h2> */}

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/jobs" element={<JobBoardPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />

          <Route path="/" element={<HomePage />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
