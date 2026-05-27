import { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard";

function SavedCountries({ countries = [] }) {

  // ====================
  // STATE
  // ====================
  const [savedCodes, setSavedCodes] = useState([]);
  const [newUserName, setNewUserName] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    bio: ""
  });

  const [loading, setLoading] = useState(true);

  // ====================
  // GET SAVED COUNTRIES
  // ====================
  const getSavedCountries = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-all-saved-countries"
      );

      const data = await response.json();
      setSavedCodes(data);

    } catch (error) {
      console.log("Error fetching saved countries:", error);
    }
  };

  // ====================
  // GET NEWEST USER
  // ====================
  const getUserNewestInfo = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-newest-user"
      );

      const data = await response.json();
      setNewUserName(data[0].name);

    } catch (error) {
      console.log("Error fetching newest user:", error);
    }
  };

  // ====================
  // POST USER
  // ====================
  const storeUserData = async (data) => {
    try {
      await fetch(
        "https://backend-answer-keys.onrender.com/add-one-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: data.fullName,
            country_name: data.country,
            email: data.email,
            bio: data.bio
          })
        }
      );

      getUserNewestInfo();

    } catch (error) {
      console.log("Error saving user:", error);
    }
  };

  // ====================
  // FORM HANDLERS
  // ====================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storeUserData(formData);

    setFormData({
      fullName: "",
      email: "",
      country: "",
      bio: ""
    });
  };

  // ====================
  // USE EFFECT
  // ====================
  useEffect(() => {
    getSavedCountries();
    getUserNewestInfo();
    setLoading(false);
  }, []);

  // ====================
  // DERIVED DATA
  // ====================
  const savedCountryObjects = countries.filter(country =>
    savedCodes.some(saved =>
      saved.country_name === country.name.common
    )
  );


  // ====================
  // LOADING / EMPTY STATES
  // ====================
  if (loading) {
    return <div>Loading saved countries...</div>;
  }

  // ====================
  // UI
  // ====================
  return (
    <div className="saved-container">

      <h1>Saved Countries</h1>

      {newUserName && (
        <h2>Welcome back, {newUserName}!</h2>
      )}

      {/* ================= FORM ================= */}
      <form className="saved-form" onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Name"
          value={formData.fullName}
          onChange={handleInputChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <input
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleInputChange}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleInputChange}
        />

        <button type="submit">Save User</button>
      </form>

      {/* ================= COUNTRIES ================= */}
      <div className="countries-grid">
        {savedCountryObjects.length ? (
          savedCountryObjects.map(country => (
            <CountryCard
              key={country.cca3}
              country={country}
            />
          ))
        ) : (
          <p>No saved countries yet.</p>
        )}
      </div>

    </div>
  );
}

export default SavedCountries;