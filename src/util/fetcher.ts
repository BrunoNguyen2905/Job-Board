export default async function fetcher(url: string) {
  const request = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!request.ok) {
    throw new Error(
      `An error occurred while fetching the data: ${request.status}`,
    );
  }

  return request.json();
}
