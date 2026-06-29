export const serverMutation = async (path, data) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || "Request failed");
    }

    return result;
  } catch (error) {
    console.error("serverMutation Error:", error);

    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};

export const serverFetch = async (path, query = {}, options = {}) => {
  try {
    const queryString = new URLSearchParams(query).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${path}?${queryString}`,
      options,
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || "Failed to fetch data");
    }

    return result;
  } catch (error) {
    console.error("serverFetch Error:", error);

    return [];
  }
};

export const serverPatch = async (path, data) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || "Request failed");
    }

    return result;
  } catch (error) {
    console.error("serverPatch Error:", error);

    return [];
  }
};
export const serverDelete = async (path, data) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || "Request failed");
    }

    return result;
  } catch (error) {
    console.error("serverDelete Error:", error);

    return [];
  }
};
