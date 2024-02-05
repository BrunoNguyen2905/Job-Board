import React, { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import useJobsSearchApiRequest from "../../api-requests/adzuna-search-jobs";
import useFindWorkJobsSearchApiRequest from "../../api-requests/findwork-search-jobs";
import {
  countryOptions,
  dayPostedOptions,
  employmentTypeOptions,
  jobTypeOptions,
} from "../../util/adzuna-job-options";
import Dropdown, { DropdownOption } from "../dropdown";
import JobItem from "../job-item";
import { TextInput } from "../text-input";

type TFindWorkJobSearchProps = any;

const FindWorkJobSearch: React.FC<TFindWorkJobSearchProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [countrySelected, setCountrySelected] = useState<DropdownOption | null>(
  //   countryOptions[0]
  // );
  // const [jobTypeSelected, setJobTypeSelected] = useState<DropdownOption | null>(
  //   jobTypeOptions[0]
  // );

  // const [dayPostedSelected, setDatePostedSelected] =
  //   useState<DropdownOption | null>(dayPostedOptions[0]);
  // const [employmentTypeSelected, setEmploymentTypeSelected] =
  //   useState<DropdownOption | null>(employmentTypeOptions[0]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  // const [debouncedCountryCode] = useDebounce(countrySelected?.value, 300);
  // const [debouncedJobType] = useDebounce(jobTypeSelected?.value, 300);
  // const [debouncedEmploymentType] = useDebounce(
  //   employmentTypeSelected?.value,
  //   300
  // );
  // const [debouncedDayPosted] = useDebounce(dayPostedSelected?.value, 300);

  const {
    data: jobSearchRes,
    error,
    isLoading,
  } = useFindWorkJobsSearchApiRequest(debouncedSearchTerm);
  return (
    <div className="z-10 flex flex-col">
      <div className="w-full">
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
      {!!searchTerm && (
        <div className="flex flex-row justify-around">
          {/* <Dropdown
            label={"Country Code"}
            name={"countryCode"}
            selection={countrySelected}
            options={countryOptions}
            onChange={setCountrySelected}
          />
          <Dropdown
            label={"Job Type"}
            name={"jobType"}
            selection={jobTypeSelected}
            options={jobTypeOptions}
            onChange={setJobTypeSelected}
          />
          <Dropdown
            label={"Employment Type"}
            name={"employmentType"}
            selection={employmentTypeSelected}
            options={employmentTypeOptions}
            onChange={setEmploymentTypeSelected}
          />
          <Dropdown
            label={"Last Posted"}
            name={"datePosted"}
            selection={dayPostedSelected}
            options={dayPostedOptions}
            onChange={setDatePostedSelected}
          /> */}
        </div>
      )}
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between">
        {isLoading ? (
          <p>Loading...</p>
        ) : jobSearchRes?.result?.results?.length ? (
          jobSearchRes?.result?.results?.map((job: any) => {
            const jobTags: (string | null)[] = [
              `${job?.employment_type ? job?.employment_type : null}`,
              `${job?.remote ? "Remote" : null}`,
            ].concat(job?.keywords);
            return (
              <div className="w-full md:w-1/2 p-4" key={job?.id}>
                <JobItem
                  title={job?.role}
                  description={job?.description}
                  locationName={job?.location}
                  companyName={job?.company_name}
                  salaryMax={job?.salary_max}
                  salaryMin={job?.salary_min}
                  redirectUrl={job?.url}
                  created={job?.date_posted}
                  jobTags={jobTags}
                />
              </div>
            );
          })
        ) : // <></>
        !jobSearchRes?.result?.results?.length && jobSearchRes !== undefined ? (
          <p>No results found</p>
        ) : error ? (
          <p className="text-red">
            There is something wrong when fetching the jobs
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FindWorkJobSearch;
