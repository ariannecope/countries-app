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
  const [userName, setUserName] = useState("");

  // ============================
  // 🔶 RETRIEVE SAVED COUNTRIES (GET)
  // ============================
  const getSavedCountries = async () => {
    try {
      const response = await fetch(
        "/api/get-all-saved-countries"
      );

      const data = await response.json();

      // API returns objects → we store ONLY names in state
      setSavedCountries(data.map(item => item.country_name));

    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  // ============================
  // 🔶 RETRIEVE USERS (GET) 
  // GET request for the user information.
  // ============================
  const getUsers = async () => {
    try {
      const response = await fetch(
        "/api/get-newest-user"
      );

      const data = await response.json();

      // if user exists → show welcome message
      if (data.length > 0) {
        setUserName(data[0].name);
      }

    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  // run GET requests on page load
  useEffect(() => {
    getSavedCountries();
    getUsers();
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
//e.preventDefault() → tells the browser, "Don't do your normal form submission."
//async + await → lets JavaScript wait for the server to respond before moving on.
    e.preventDefault();
//The try block contains the await fetch(), which sends a POST request to the /api/add-one-user endpoint. The backend receives the form data and saves it to the database.
// Frontend: sends the request.
// Backend: receives it and talks to the database.
// The frontend never inserts rows into the database directly—it always asks the backend to do it.
    try {
      const response = await fetch(
        "/api/add-one-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.text();

  console.log("FORM RESPONSE:", data);

// display backend message
setMessage(data);

      // update welcome message
      setUserName(formData.name);

      // update saved list locally
      setSavedCountries(prev => [
        ...prev,
        formData.country_name
      ]);

      // clear form
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

        {/* Welcome returning user */}
{userName ? (
  <h2>Welcome, {userName}!</h2>
) : (
  <form className="saved-form" onSubmit={handleSubmit}>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            name="country_name"
            value={formData.country_name}
            onChange={handleChange}
            placeholder="Country"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
          />

          <button type="submit">Submit</button>

     </form>
)}

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


