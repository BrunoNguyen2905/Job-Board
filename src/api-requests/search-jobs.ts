import useSWR from "swr";
import fetcher from "../util/fetcher";

export default function useJobsSearchApiRequest(searchTerm: string) {
  return useSWR(
    searchTerm
      ? `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.REACT_APP_ADZUNA_APP_ID}&app_key=${process.env.REACT_APP_ADZUNA_APP_KEY}&results_per_page=20&what=${searchTerm}&content-type=application/json&max_days_old=1`
      : null,
    fetcher,
  );
}
