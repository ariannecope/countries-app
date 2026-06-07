import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CountryDetail({
  countries = [],
  savedCountries = [],
  setSavedCountries = () => {}
}) {

  // ======================
  // STATE
  // ======================
  // Stores how many times this country has been viewed (from API)
  const [countryCount, setCountryCount] = useState(0);

  // ======================
  // ROUTER HOOKS
  // ======================
  // Gets the country code from the URL (/:code)
  const { code } = useParams();

  // Allows navigation between pages programmatically
  const navigate = useNavigate();

  // ======================
  // LOADING / SAFETY CHECKS
  // ======================
  // Prevents errors if countries haven't loaded yet
  if (!countries.length) {
    return <div>Loading countries...</div>;
  }

  // Find the selected country using the URL code (cca3)
  const country = countries.find((c) => c.cca3 === code);

  // If no match is found, show fallback UI
  if (!country) {
    return <div>Country not found</div>;
  }

  // ======================
  // SAVED STATE CHECK
  // ======================
  // Checks if this country is already in savedCountries list
  const isSaved = savedCountries.some(
    (c) => c.cca3 === country.cca3
  );

  // ======================
  // COUNTRY COUNT (POST REQUEST)
  // ======================
  // Runs when the page loads or when the selected country changes
  useEffect(() => {
    const updateCountryCount = async () => {
      try {
        const response = await fetch("/api/update-one-country-count", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            country_name: country.name.common
          })
        });

        const data = await response.json();
        console.log("SAVE RESPONSE:", data);

        // Store updated view count from backend
        setCountryCount(data.count);

      } catch (error) {
        console.log("Error updating country count:", error);
      }
    };

    // Only run if country exists
    if (country) {
      updateCountryCount();
    }
    //this useeffect dependency prevents unnecessary API calls.
  }, [country?.name?.common]);

  // ======================
  // SAVE COUNTRY (POST REQUEST)
  // ======================
  const handleSave = async () => {
    try {

      //“Store the result of fetch in a variable so I can check if it worked.”
      const response = await fetch("/api/save-one-country", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        // Sends full country object to backend
        body: JSON.stringify({
          country_name: country.name.common
        })
      });
//to catch silent errors
      if (!response.ok) {
  throw new Error("Failed to save country");
}

const data = await response.json();
console.log(data);

      // Optimistically update savedCountries state locally
      setSavedCountries((prev) => {
        // Prevent duplicates
        if (prev.some((c) => c.cca3 === country.cca3)) return prev;
        return [...prev, country.name.common];
      });

    } catch (error) {
      console.log("Error saving country:", error);
    }
  };

  // ======================
  // BORDER COUNTRIES
  // ======================
  // Converts border country codes into full country objects
  const borderCountries = country?.borders
    ?.map((borderCode) => {
      return countries.find((c) => c.cca3 === borderCode);
    })
    .filter(Boolean); // removes undefined values if no match

  // ======================
  // RENDER
  // ======================
  return (
    <div className="country-detail">

      {/* ================= TOP BUTTONS ================= */}
      <div className="top-buttons">

        {/* Navigate back to homepage */}
        <button onClick={() => navigate("/")}>
          ⬅ Back
        </button>

        {/* Save button (disabled if already saved) */}
        <button onClick={handleSave} disabled={isSaved}>
          {isSaved ? "Saved ✓" : "Save Country"}
        </button>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="country-content">

        {/* COUNTRY FLAG */}
        <div className="flag-container">
          <img
            src={
              country.flags?.svg ||
              country.flags?.png ||
              "https://via.placeholder.com/150"
            }
            alt={`Flag of ${country.name.common}`}
          />
        </div>

        {/* COUNTRY INFORMATION */}
        <div className="country-info">
          <h1>{country.name.common}</h1>

          <p><strong>Population:</strong> {country.population}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
          <p><strong>Country Code:</strong> {country.cca3}</p>

          {/* SAVED STATUS */}
          <p>
            <strong>Saved:</strong> {isSaved ? "Yes" : "No"}
          </p>

          {/* VIEW COUNT FROM API */}
          <p>
            <strong>Country Views:</strong> {countryCount}
          </p>

          {/* BORDER COUNTRIES SECTION */}
          <p>
            <strong>Border Countries:</strong>
          </p>

          {/* If border countries exist, show clickable list */}
          {borderCountries?.length ? (
            <ul className="border-list">
              {borderCountries.map((borderCountry) => (
                <li
                  key={borderCountry.cca3}
                  onClick={() =>
                    navigate(`/country/${borderCountry.cca3}`)
                  }
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginBottom: "6px"
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