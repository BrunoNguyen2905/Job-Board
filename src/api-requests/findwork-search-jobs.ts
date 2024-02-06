import useSWR from "swr";
import fetcher from "../util/fetcher";

export default function useFindWorkJobsSearchApiRequest(searchTerm: string) {
  return useSWR(
    searchTerm
      ? `${process.env.REACT_APP_API_HOST_URL}/api/find-work/job-search?searchTerm=${searchTerm}`
      : null,
    fetcher
  );
}
