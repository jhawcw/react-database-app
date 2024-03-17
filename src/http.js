export async function fetchAvailablePlaces() {
  const response = await fetch("/api/places");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("An error has occured!");
  }
  return data.places;
}

export async function updateUserPlaces(places) {
  console.log("update user places fired");
  console.log(places);
  const response = await fetch("/api/user-places", {
    method: "PUT",
    body: JSON.stringify({
      places: places,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log("this is my data", data);

  if (!response.ok) {
    throw new Error("Failed to update user places");
  }
  return data.message;
}

export async function fetchUserPlaces() {
  const response = await fetch("/api/user-places");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch user places!");
  }
  return data.places;
}
