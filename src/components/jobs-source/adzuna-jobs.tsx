import React, { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import useJobsSearchApiRequest from "../../api-requests/adzuna-search-jobs";
import {
  countryOptions,
  dayPostedOptions,
  employmentTypeOptions,
  jobTypeOptions,
} from "../../util/adzuna-job-options";
import Dropdown, { DropdownOption } from "../dropdown";
import JobItem from "../job-item";
import { TextInput } from "../text-input";

type TJobSearchProps = any;

const AdzunaJobSearch: React.FC<TJobSearchProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countrySelected, setCountrySelected] = useState<DropdownOption | null>(
    countryOptions[0]
  );
  const [jobTypeSelected, setJobTypeSelected] = useState<DropdownOption | null>(
    jobTypeOptions[0]
  );

  const [dayPostedSelected, setDatePostedSelected] =
    useState<DropdownOption | null>(dayPostedOptions[0]);
  const [employmentTypeSelected, setEmploymentTypeSelected] =
    useState<DropdownOption | null>(employmentTypeOptions[0]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [debouncedCountryCode] = useDebounce(countrySelected?.value, 300);
  const [debouncedJobType] = useDebounce(jobTypeSelected?.value, 300);
  const [debouncedEmploymentType] = useDebounce(
    employmentTypeSelected?.value,
    300
  );
  const [debouncedDayPosted] = useDebounce(dayPostedSelected?.value, 300);

  const {
    data: jobSearchRes,
    error,
    isLoading,
  } = useJobsSearchApiRequest(
    debouncedSearchTerm,
    String(debouncedCountryCode),
    String(debouncedJobType),
    String(debouncedEmploymentType),
    Number(debouncedDayPosted)
  );
  console.log("jobSearchRes", jobSearchRes);

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
        <div className="w-full">
          <h1>Advanced filters:</h1>
          <div className="flex flex-row justify-around">
            <Dropdown
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
            />
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between">
        {isLoading ? (
          <p>Loading...</p>
        ) : jobSearchRes?.results?.length ? (
          jobSearchRes?.results?.map((job: any) => {
            const jobTags: (string | null)[] = [
              `${job?.contract_time ? job?.contract_time : null}`,
              `${job.category.tag ? job.category.tag : null}`,
              `${job.contract_type ? job.contract_type : null}`,
            ];
            return (
              <div className="w-full md:w-1/2 p-4" key={job?.id}>
                <JobItem
                  title={job?.title}
                  description={job?.description}
                  locationName={job?.location?.display_name}
                  companyName={job?.company?.display_name}
                  salaryMax={job?.salary_max}
                  salaryMin={job?.salary_min}
                  redirectUrl={job?.redirect_url}
                  created={job?.created}
                  jobTags={jobTags}
                />
              </div>
            );
          })
        ) : !jobSearchRes?.results?.length && jobSearchRes !== undefined ? (
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

export default AdzunaJobSearch;
