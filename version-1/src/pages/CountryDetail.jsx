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
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => navigate(-1)}>← Back</button>

        <button onClick={toggleSave}>
          {isSaved ? "Unsave" : "Save"}
        </button>
      </div>

      <h1>{country.name.common}</h1>

      <img src={country.flags.svg} alt={country.name.common} />

      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital?.[0]}</p>
    </div>
  );
}

export default CountryDetail;