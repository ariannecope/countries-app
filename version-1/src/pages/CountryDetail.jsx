import { useParams, useNavigate } from "react-router-dom";

function CountryDetail({ countries = [], savedCountries = [], setSavedCountries = () => {} }) {
  const { code } = useParams();
  const navigate = useNavigate();

  const country = countries.find(c => c.cca3 === code);

  if (!countries.length) {
    return <div>Loading countries...</div>;
  }

  if (!country) {
    return <div>Country not found</div>;
  }

  const isSaved = savedCountries.some(c => c.cca3 === country.cca3);

  function toggleSave() {
    if (isSaved) {
      setSavedCountries(savedCountries.filter(c => c.cca3 !== country.cca3));
    } else {
      setSavedCountries([...savedCountries, country]);
    }
  }

return (
  <div className="country-detail">

    <div className="top-buttons">
      <button onClick={() => navigate(-1)}>← Back</button>

      <button onClick={toggleSave}>
        {isSaved ? "Unsave" : "Save"}
      </button>
    </div>

    <div className="country-content">

      <div className="flag-container">
        <img src={country.flags.svg} alt={country.name.common} />
      </div>

      <div className="country-info">
        <h1>{country.name.common}</h1>

        <p><strong>Population:</strong> {country.population}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      </div>

    </div>

  </div>
);
}

export default CountryDetail;