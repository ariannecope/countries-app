import { Link } from "react-router-dom";

function CountryCard({ country }) {
  return (
    <Link to={`/country/${country.cca3}`}>
      <div className="country-card">
        <img
          src={
            country.flags?.svg ||
            country.flags?.png ||
            "https://via.placeholder.com/150"
          }
          alt={`Flag of ${country.name.common}`}
        />

        <h2>{country.name.common}</h2>

        <p><strong>Population:</strong> {country.population}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      </div>
    </Link>
  );
}

export default CountryCard;
// Some countries might not have a capital ?. prevents your app from crashing