import { useParams, useNavigate } from "react-router-dom";

function CountryDetail({
  countries = [],
  savedCountries = [],
  setSavedCountries = () => {}
}) {
  const { code } = useParams();
  const navigate = useNavigate();

  // ======================
  // LOADING STATE
  // ======================
  // If countries haven't loaded yet from App.jsx API call
  if (!countries.length) {
    return <div>Loading countries...</div>;
  }

  // ======================
  // FIND CURRENT COUNTRY
  // ======================
  // Match URL param (cca3 code) to full country object
  const country = countries.find(c => c.cca3 === code);

  // If no match is found, show error state
  if (!country) {
    return <div>Country not found</div>;
  }

  // ======================
  // CHECK IF COUNTRY IS SAVED
  // ======================
  // This determines button text (Save vs Unsave)
  const isSaved = savedCountries.some(
    c => c.cca3 === country.cca3
  );

  // ======================
  // SAVE / UNSAVE FUNCTION (POST + UI UPDATE)
  // ======================
  const handleSave = async () => {
    try {

      // ======================
      // UNSAVE FLOW
      // ======================
      if (isSaved) {

        // 1. Update UI immediately (React state update)
        // Removes country from saved list in memory
        setSavedCountries(prev =>
          prev.filter(c => c.cca3 !== country.cca3)
        );

        // 2. Send POST request to backend to remove it from database
        await fetch("/api/remove-country", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            // This tells backend which country to remove
            country_name: country.name.common
          })
        });

        // Stop here so we don't also run save logic
        return;
      }

      // ======================
      // SAVE FLOW
      // ======================

      // 1. Send POST request to backend to save country
      await fetch("/api/save-one-country", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // This is the value stored in backend database
          country_name: country.name.common
        })
      });

      // 2. Update UI immediately so user sees change instantly
      // Adds country to saved list in React state
      setSavedCountries(prev => [...prev, country]);

    } catch (error) {
      console.log("Error saving country:", error);
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="country-detail">

      {/* Back button returns user to previous page */}
      <button onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Country name */}
      <h1>{country.name.common}</h1>

      {/* Country flag */}
      <img
        src={country.flags?.svg}
        alt={country.name.common}
      />

      {/* Basic country info */}
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population}</p>

      {/* Save / Unsave button */}
      {/* Text changes dynamically based on whether country is saved */}
      <button onClick={handleSave}>
        {isSaved ? "Unsave" : "Save"}
      </button>

    </div>
  );
}

export default CountryDetail;