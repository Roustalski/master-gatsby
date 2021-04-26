export type GqlResponse<T> = {
  data: T;
};

const fetchGqlJson = async <T>(
  url: string,
  gqlQuery: string
): Promise<GqlResponse<T>> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: gqlQuery,
    }),
  });
  return await res.json();
};

export default fetchGqlJson;
