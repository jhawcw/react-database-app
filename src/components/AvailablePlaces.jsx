import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

let isLoading = true;

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch("http://localhost:3000/places")

    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(places);
        });
        setIsLoading(false);
      } catch (err) {
        setError({ message: error.message || "Could not fetch places!" });
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title={"An error occurred!"} message={error.message}></Error>;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      isLoadingText={"Loading image"}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
