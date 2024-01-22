import useSWR from "swr";
import fetcher from "../util/fetcher";

export default function useJobsSearchApiRequest(
  searchTerm: string,
  countryCode: string,
  jobType?: string,
  employmentType?: string,
  dayPosted?: number,
) {
  return useSWR(
    searchTerm
      ? `https://api.adzuna.com/v1/api/jobs/${countryCode}/search/1?app_id=${
          process.env.REACT_APP_ADZUNA_APP_ID
        }&app_key=${
          process.env.REACT_APP_ADZUNA_APP_KEY
        }&results_per_page=20&what=${searchTerm}&content-type=application/json&max_days_old=${dayPosted}${
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
    fetcher,
  );
}
