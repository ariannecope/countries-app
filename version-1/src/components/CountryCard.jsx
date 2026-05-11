function CountryCard({ country }) {
  return (
    <div className="country-card">
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

      <h2>{country.name.common}</h2>

      <p><strong>Population:</strong> {country.population}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
    </div>
  );
}

export default CountryCard;

// Some countries might not have a capital ?. prevents your app from crashing