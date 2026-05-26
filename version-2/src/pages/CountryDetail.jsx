import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

// CountryDetail component
// Receives props from App.jsx
// if countries is missing → use an empty array []
// if savedCountries is missing → use an empty array []
// if setSavedCountries is missing → use an empty function
// This is mostly a safety net while developing.

function CountryDetail({ 
  countries = [], 
  savedCountries = [], 
  setSavedCountries = () => {} 
}) {

  // ====================
  // STATE
  // ====================

  // Message displayed after saving a country
  const [message, setMessage] = useState("")


  // ====================
  // ROUTER
  // ====================

  // useParams grabs the "code" value from the URL
  // Example route: /country/USA
  // code would equal "USA"
  const { code } = useParams();

  // useNavigate lets us move the user to another page
  const navigate = useNavigate();


  // ====================
  // DERIVED VALUES
  // ====================

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
  const isSaved = savedCountries.some(
    c => c.cca3 === country.cca3
  );

  // BORDER COUNTRIES:
  // This loops through border country codes,
  // finds matching country objects,
  // and removes undefined values with filter(Boolean)
  const borderCountries = country?.borders
    ?.map((borderCode) => {
      return countries.find((c) => c.cca3 === borderCode);
    })
    .filter(Boolean);


  // ====================
  // FUNCTIONS
  // ====================

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

  // POST REQUEST:
  // Save country to backend
  async function handleSave() {

    // If already saved → unsave it
    if (isSaved) {

      toggleSave();

      // Clear success message
      setMessage("");

      return;
    }

    // Otherwise save it
    try {

      const response = await fetch(
        "https://backend-answer-keys.onrender.com/save-one-country",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            country_name: country.name.common
          })
        }
      );

      const data = await response.text();

      // Display success message
      setMessage(data);

      // Update local saved countries state
      toggleSave();

    } catch (error) {

      console.log(error);

    }
  }


  // ====================
  // JSX / UI
  // ====================

  return (
    <div className="country-detail">

      {/* Top row buttons */}
      <div className="top-buttons">

        {/* Go back to previous page */}
        <button onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* Save / Unsave button */}
        <button onClick={handleSave}>
          {isSaved ? "Unsave" : "Save"}
        </button>

      </div>

      {/* Display message when country is saved */}
      {message && <p>{message}</p>}

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

          {/* Border countries heading */}
          <p>
            <strong>Border Countries:</strong>
          </p>

          {/* 
            If this country has neighbors:
            → loop through them
            → display each one as clickable
            → clicking navigates to that country page

            Otherwise:
            → show "None"
          */}
          {borderCountries?.length ? (

            <ul>
              {borderCountries.map((borderCountry) => (

                <li
                  key={borderCountry.cca3}
                  onClick={() => navigate(`/country/${borderCountry.cca3}`)}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline"
                  }}
                >
                  {borderCountry.name.common}
                </li>

              ))}
            </ul>

          ) : (

            <p>None</p>

          )}

        </div>
      </div>
    </div>
  );
}

export default CountryDetail;