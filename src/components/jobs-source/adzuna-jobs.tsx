import React, { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import useJobsSearchApiRequest from "../../api-requests/adzuna-search-jobs";
import {
  countryOptions,
  dayPostedOptions,
  employmentTypeOptions,
  jobTypeOptions,
} from "../../util/adzuna-job-options";
import Dropdown, { DropdownOption } from "../dropdown";
import JobLists from "../job-lists";
import PaginationControl from "../paginated-items";
import { TextInput } from "../text-input";

type TJobSearchProps = any;

const AdzunaJobSearch: React.FC<TJobSearchProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

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
  const [debouncedSearchPage] = useDebounce(searchPage, 300);

  const {
    data: jobSearchRes,
    error,
    isLoading,
    mutate: syncJobSearch,
  } = useJobsSearchApiRequest(
    debouncedSearchTerm,
    String(debouncedCountryCode),
    // debouncedSearchPage,
    searchPage,
    itemsPerPage,
    String(debouncedJobType),
    String(debouncedEmploymentType),
    Number(debouncedDayPosted)
  );

  //pagination
  const pageCount = useMemo(() => {
    return jobSearchRes?.count
      ? Math.ceil(jobSearchRes?.count / itemsPerPage)
      : 0;
  }, [jobSearchRes]);
  const handlePageClick = (event: { selected: number }) => {
    setSearchPage(() => event.selected + 1);
  };

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
        <JobLists
          isLoading={isLoading}
          items={jobSearchRes?.results?.map((job: any) => {
            const jobTags: (string | null)[] = [
              `${job?.contract_time ? job?.contract_time : null}`,
              `${job.category.tag ? job.category.tag : null}`,
              `${job.contract_type ? job.contract_type : null}`,
            ];
            return {
              title: job?.title,
              description: job?.description,
              locationName: job?.location?.display_name,
              companyName: job?.company?.display_name,
              salaryMax: job?.salary_max,
              salaryMin: job?.salary_min,
              redirectUrl: job?.redirect_url,
              created: job?.created,
              jobTags,
            };
          })}
          error={error}
        />
        <PaginationControl
          handlePageClick={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};

export default AdzunaJobSearch;
