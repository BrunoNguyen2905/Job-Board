import React from "react";
import JobSearch from "../../components/job-search";

type TJobBoardPageProps = any;

const JobBoardPage: React.FC<TJobBoardPageProps> = () => (
  <div>
    <h1>Job Board Page</h1>
    <JobSearch />
  </div>
);

export default JobBoardPage;
