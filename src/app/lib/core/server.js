export const serverMutation = async (path, data) => {
  const response = await fetch(`process.env.NEXT_PUBLIC_API_URL/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return result;
};

//
export const serverFetch = async (path, query = {}) => {
  const queryString = new URLSearchParams(query).toString();

  const response = await fetch(
    `process.env.NEXT_PUBLIC_API_URL/${path}?${queryString}`,
  );
  const result = await response.json();

  return result;
};
