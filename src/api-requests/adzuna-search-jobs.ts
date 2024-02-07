import useSWR from "swr";
import fetcher from "../util/fetcher";

export default function useAdzunaJobsSearchApiRequest(
  searchTerm: string,
  countryCode: string,
  page: number,
  itemsPerPage: number,
  jobType?: string,
  employmentType?: string,
  dayPosted?: number
) {
  return useSWR(
    searchTerm
      ? `https://api.adzuna.com/v1/api/jobs/${countryCode}/search/${page}?app_id=${
          process.env.REACT_APP_ADZUNA_APP_ID
        }&app_key=${
          process.env.REACT_APP_ADZUNA_APP_KEY
        }&results_per_page=${itemsPerPage}&what=${searchTerm}&content-type=application/json&max_days_old=${dayPosted}${
          jobType === "full_time"
            ? "&full_time=1"
            : jobType === "part_time"
              ? "&part_time=1"
              : ""
        }${
          employmentType === "permanent"
            ? "&permanent=1"
            : employmentType === "contract"
              ? "&contract=1"
              : ""
        }`
      : null,
    fetcher
  );
}
