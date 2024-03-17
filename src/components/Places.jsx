export default function Places({
  title,
  places,
  fallbackText,
  onSelectPlace,
  isLoading,
  isLoadingText,
}) {
  // console.log(places);
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {isLoading && <p className="fallback-text">{isLoadingText}</p>}
      {!isLoading && places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {!isLoading && places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <h3>{place.title}</h3>
                <img src={`/api/${place.image.src}`} alt={place.image.alt} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}