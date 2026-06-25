export const serverMutation = async (path, data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const serverFetch = async (path, query = {}) => {
  const queryString = new URLSearchParams(query).toString();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${path}?${queryString}`,
    {
      cache: "no-store",
    },
  );

  return response.json();
};
