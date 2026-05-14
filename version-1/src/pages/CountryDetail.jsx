import { useParams, useNavigate } from "react-router-dom";

// CountryDetail component
// Receives props from App.jsx
// if countries is missing → use an empty array []
// if savedCountries is missing → use an empty array []
// if setSavedCountries is missing → use an empty function--a tiny “do nothing” function that prevents crashes. This is mostly a safety net while developing. In a finished app, you often don't need defaults for state setter functions if you're sure the prop will always exist.
function CountryDetail({ 
  countries = [], 
  savedCountries = [], 
  setSavedCountries = () => {} 
}) {

  // useParams grabs the "code" value from the URL
  // Example route: /country/USA
  // code would equal "USA"
  const { code } = useParams();

  // useNavigate lets us move the user to another page
  const navigate = useNavigate();

  // Find the country object whose cca3 matches the URL code
  const country = countries.find(c => c.cca3 === code);

  // If countries haven't loaded yet, show loading message
  if (!countries.length) {
    return <div>Loading countries...</div>;
  }

  // If no matching country was found, show error message
  if (!country) {
    return <div>Country not found</div>;
  }

  // Check whether this country is already saved
  // .some() returns true or false
  //cca3 is a property from the country data itself. It stands for: Country Code Alpha-3
  
  const isSaved = savedCountries.some(
    c => c.cca3 === country.cca3
  );

  // Add or remove country from savedCountries
  function toggleSave() {

    // If country is already saved...
    if (isSaved) {

      // Remove it from the array
      setSavedCountries(
        savedCountries.filter(
          c => c.cca3 !== country.cca3
        )
      );

    } else {

      // Otherwise add it to the array
      setSavedCountries([
        ...savedCountries,
        country
      ]);
    }
  }

  return (
    <div className="country-detail">

      {/* Top row buttons */}
      <div className="top-buttons">

        {/* Go back to previous page */}
        <button onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* Save or unsave country */}
        <button onClick={toggleSave}>
          {isSaved ? "Unsave" : "Save"}
        </button>
      </div>

      <div className="country-content">

        {/* Flag image section */}
        <div className="flag-container">
          <img 
            src={country.flags.svg} 
            alt={country.name.common} 
          />
        </div>

        {/* Country information section */}
        <div className="country-info">

          {/* Country name */}
          <h1>{country.name.common}</h1>

          {/* Country details */}
          <p>
            <strong>Population:</strong> {country.population}
          </p>

          <p>
            <strong>Region:</strong> {country.region}
          </p>

          <p>
            <strong>Capital:</strong> {country.capital?.[0]}
          </p>

        </div>
      </div>
    </div>
  );
}

export default CountryDetail;