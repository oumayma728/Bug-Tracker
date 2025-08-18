const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const fetchBugs = async () => {
  try {
    const res = await fetch(`${API_BASE}/bug`);
    if (!res.ok) throw new Error("Failed to fetch bugs");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
