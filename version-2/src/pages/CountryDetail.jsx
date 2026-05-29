import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CountryDetail({
  countries = [],
  savedCountries = [],
  setSavedCountries = () => {}
}) {
//setting states
  const [countryCount, setCountryCount] = useState(0)
  //react router hooks
  const { code } = useParams();
  const navigate = useNavigate();

  if (!countries.length) {
    return <div>Loading countries...</div>;
  }

  const country = countries.find((c) => c.cca3 === code);

  if (!country) {
    return <div>Country not found</div>;
  }

  // check saved state safely
  const isSaved = savedCountries.some(
    (c) => c.cca3 === country.cca3
  );

  // ======================
  // COUNTRY COUNT--POST
  // ======================
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

      setCountryCount(data.count);
    } catch (error) {
      console.log("Error updating country count:", error);
    }
  };

  if (country) {
    updateCountryCount();
  }
}, [country]);

  // ======================
  // SAVE FUNCTION--POST
  // ======================
  const handleSave = async () => {
    try {
      await fetch("/api/save-one-country", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
 body: JSON.stringify({
  country: country
})
      });

      setSavedCountries((prev) => {
        if (prev.some((c) => c.cca3 === country.cca3)) return prev;
        return [...prev, country];
      });
    } catch (error) {
      console.log("Error saving country:", error);
    }
  };
//border countries
   const borderCountries = country?.borders?.map((borderCode) => {
  return countries.find((c) => c.cca3 === borderCode);
}).filter(Boolean);                 

  return (
    <div className="country-detail">

      {/* ================= TOP BUTTONS ================= */}
      <div className="top-buttons">

        <button onClick={() => navigate("/")}>
          ⬅ Back
        </button>

        <button onClick={handleSave} disabled={isSaved}>
          {isSaved ? "Saved ✓" : "Save Country"}
        </button>

      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="country-content">

        {/* FLAG */}
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

        {/* INFO */}
        <div className="country-info">
          <h1>{country.name.common}</h1>

          <p><strong>Population:</strong> {country.population}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
          <p><strong>Country Code:</strong> {country.cca3}</p>

          <p>
            <strong>Saved:</strong>{" "}
            {isSaved ? "Yes" : "No"}
          </p>

{/* Country View Count */}
          <p>
  <strong>Country Views:</strong> {countryCount}
</p>

{/* border countries */}
{/* BORDER COUNTRIES */}
<p>
  <strong>Border Countries:</strong>
</p>

{borderCountries?.length ? (
  <ul className="border-list">
    {borderCountries.map((borderCountry) => (
      <li
        key={borderCountry.cca3}
        onClick={() => navigate(`/country/${borderCountry.cca3}`)}
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