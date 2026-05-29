import { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard";

function SavedCountries({ countries, savedCountries, setSavedCountries }) {
  const [formData, setFormData] = useState({
    name: "",
    country_name: "",
    email: "",
    bio: ""
  });

  const [message, setMessage] = useState("");

  // ============================
  // 🔶 RETRIEVE SAVED COUNTRIES (GET)
  // ============================
  const getSavedCountries = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-all-saved-countries"
      );
      const data = await response.json();

      // API returns objects → we store ONLY names in state
      setSavedCountries(data.map(item => item.country_name));
    } catch (error) {
      console.log("Error:", error.message);

      console.log("RAW SAVED DATA:", data);
    }
  };

  // run GET on page load
  useEffect(() => {
    getSavedCountries();
  }, []);

  console.log("savedCountries:", savedCountries);
  console.log("countries:", countries);

  // ============================
  // 🔶 INSTRUCTOR REQUIRED LOGIC
  // (map + find pattern)
  // ============================

  
  // Go through saved country names
  // For each one, find full country object from countries prop
const savedCountryObjects = savedCountries
  .map((savedName) => {
    return countries.find((country) => {
      return country.name.common === savedName;
    });
  })
  .filter(Boolean); // removes undefined if no match

  // DEBUG (safe now because variable exists above)
  console.log("savedCountryObjects:", savedCountryObjects);
  console.log("FIRST COUNTRY:", countries[0]);

  // ============================
  // 🔶 FORM HANDLERS
  // ============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/add-one-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      setMessage(data);

      // update saved list locally
      setSavedCountries(prev => [
        ...prev,
        formData.country_name
      ]);

      setFormData({
        name: "",
        country_name: "",
        email: "",
        bio: ""
      });
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div className="saved-container">

      <div className="page-wrapper">
        <h1>Saved Countries</h1>

        <form className="saved-form" onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input name="country_name" value={formData.country_name} onChange={handleChange} placeholder="Country" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
          <button type="submit">Save Country</button>
        </form>

        {message && <p>{message}</p>}
      </div>

      <div className="countries-grid">
        {savedCountryObjects.map(country => (
          <CountryCard
            key={country.cca3}
            country={country}
          />
        ))}
      </div>

    </div>
  );
}

export default SavedCountries;



