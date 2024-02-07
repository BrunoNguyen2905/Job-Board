import React, { useState } from "react";
import JobItem, { TJobItemProps } from "./job-item";

type TJobListsProps = {
  items: TJobItemProps[];
  isLoading: boolean;
  error: any;
};

const JobLists: React.FC<TJobListsProps> = ({ items, isLoading, error }) => {
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : items?.length ? (
        items?.map((job) => {
          return (
            <div className="w-full md:w-1/2 p-4" key={job.id}>
              <JobItem {...job} />
            </div>
          );
        })
      ) : !items?.length && items !== undefined ? (
        <p>No results found</p>
      ) : error ? (
        <p className="text-red">
          There is something wrong when fetching the jobs
        </p>
      ) : (
        <></>
      )}
    </>
  );
};

export default JobLists;
