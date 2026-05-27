import { useParams, useNavigate } from "react-router-dom";

function CountryDetail({
  countries = [],
  savedCountries = [],
  setSavedCountries = () => {}
}) {
  const { code } = useParams();
  const navigate = useNavigate();

  if (!countries.length) {
    return <div>Loading countries...</div>;
  }

  const country = countries.find(c => c.cca3 === code);

  if (!country) {
    return <div>Country not found</div>;
  }

  const isSaved = savedCountries.includes(country.cca3);

  const toggleSave = () => {
    if (isSaved) {
      setSavedCountries(prev =>
        prev.filter(c => c !== country.cca3)
      );
    } else {
      setSavedCountries(prev => [...prev, country.cca3]);
    }
  };

  return (
    <div className="country-detail">
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>{country.name.common}</h1>

      <img src={country.flags?.svg} alt={country.name.common} />

      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population}</p>

      <button onClick={toggleSave}>
        {isSaved ? "Unsave" : "Save"}
      </button>
    </div>
  );
}

export default CountryDetail;