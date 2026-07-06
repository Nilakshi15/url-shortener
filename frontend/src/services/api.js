const BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.message ??
      `Request failed (${res.status})`
    );
  }

  return data;
}

// POST /api/v1/shorten
export async function shortenUrl({ originalUrl, customAlias }) {

  console.log("Received in api.js:", {
    originalUrl,
    customAlias,
  });

  const response = await request("/api/v1/shorten", {
    method: "POST",
    body: JSON.stringify({
      url: originalUrl,
      ...(customAlias ? { alias: customAlias } : {}),
    }),
  });

  return response.data;
}

// GET /api/v1/analytics/:code
export async function getAnalytics(shortCode) {
  const response = await request(`/api/v1/analytics/${shortCode}`);
  return response.data;
}

// GET /api/v1/urls
export async function getAllUrls() {
  return request("/api/v1/urls");
}