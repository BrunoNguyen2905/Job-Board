import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import useJobsSearchApiRequest from "../api-requests/search-jobs";
import JobItem from "./job-item";
import { TextInput } from "./text-input";

type TJobSearchProps = any;

const JobSearch: React.FC<TJobSearchProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const {
    data: jobSearchRes,
    error,
    isLoading,
  } = useJobsSearchApiRequest(debouncedSearchTerm);
  console.log("jobSearchRes", jobSearchRes);
  return (
    <div className="max-w-6xl mx-auto my-8 px-3 z-10 flex flex-col">
      <h1>Job Search</h1>
      <div className="flex flex-col w-full">
        <TextInput
          className="mb-4 max-w-xl"
          name={"searchTerm"}
          label={"Search your desired job"}
          placeholder="Software developer..."
          value={searchTerm}
          onChange={setSearchTerm}
          showClearButton
          required
        />
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between">
        {isLoading ? (
          <p>Loading...</p>
        ) : jobSearchRes?.results?.length ? (
          jobSearchRes?.results?.map((job: any) => (
            <div className="w-full md:w-1/2 p-4" key={job?.id}>
              <JobItem job={job} />
            </div>
          ))
        ) : !jobSearchRes?.results?.length && jobSearchRes !== undefined ? (
          <p>No results found</p>
        ) : error ? (
          <p className="text-red">{error}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
