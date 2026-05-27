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

  // check saved state safely (by code)
  const isSaved = savedCountries.some(
    c => c.cca3 === country.cca3
  );

  // ======================
  // SAVE / UNSAVE FUNCTION
  // ======================
  const handleSave = async () => {
    try {

      // =========================
      // UNSAVE FLOW (REMOVE)
      // =========================
      // If the country is already saved, we treat this click as "unsave"
      if (isSaved) {

        // remove locally
        // This immediately updates the UI so the country disappears from saved state
        setSavedCountries(prev =>
          prev.filter(c => c.cca3 !== country.cca3)
        );

        // optional: backend unsave endpoint (if you have one)
        // This tells the backend to remove the country from the database
        await fetch("/api/remove-country", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            country_name: country.name.common
          })
        });

        // stop here so we do NOT also run save logic
        return;
      }

      // =========================
      // SAVE FLOW (ADD)
      // =========================
      // If the country is NOT already saved, we treat this click as "save"

      // POST: save country to backend
      await fetch("/api/save-one-country", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          // the data object being sent to the backend.
          // this tells the backend which country to save
          country_name: country.name.common
        })
      });

      // update UI immediately
      // Before click:
      // Save button says “Save”
      // Country not in saved list
      //
      // After click:
      // - state updates instantly
      // - button flips to “Unsave”
      // - SavedCountries page reflects change (if using same state)
      //
      // prev = current savedCountries array
      // ...prev = keeps existing items
      // country = adds new saved country
      setSavedCountries(prev => [...prev, country]);

    } catch (error) {
      console.log("Error saving country:", error);
    }
  };

  return (
    <div className="country-detail">

      <button onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>{country.name.common}</h1>

      <img
        src={country.flags?.svg}
        alt={country.name.common}
      />

      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population}</p>

      <button onClick={handleSave}>
        {isSaved ? "Unsave" : "Save"}
      </button>

    </div>
  );
}

export default CountryDetail;