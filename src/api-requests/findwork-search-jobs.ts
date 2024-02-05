import useSWR from "swr";
import fetcher from "../util/fetcher";

export default function useFindWorkJobsSearchApiRequest(searchTerm: string) {
  return useSWR(
    searchTerm
      ? `http://localhost:3001/api/find-work/job-search?searchTerm=${searchTerm}`
      : null,
    fetcher
  );
}
