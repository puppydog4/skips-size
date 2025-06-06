export async function fetchSkips() {
  const url =
    "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch skip data");
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error fetching skips:", err);
    return [];
  }
}
