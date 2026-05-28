import { useState, useEffect } from "react";

function SavedCountries() {
  // =========================
  // STATE
  // =========================

  const [formData, setFormData] = useState({
    name: "",
    country_name: "",
    email: "",
    bio: ""
  });

  const [message, setMessage] = useState("");
  const [savedCountries, setSavedCountries] = useState([]);

  // =========================
  // GET SAVED COUNTRIES
  // =========================
  useEffect(() => {
    getSavedCountries();
  }, []);

  const getSavedCountries = async () => {
    try {
      const response = await fetch(
        "https://backend-answer-keys.onrender.com/get-all-saved-countries"
      );

      const data = await response.json();
      setSavedCountries(data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  // =========================
  // FORM HANDLERS
  // =========================
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

      getSavedCountries();

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

  // =========================
  // JSX
  // =========================
  return (
    <div className="saved-container">

      <div className="page-wrapper">
        <h1>Saved Countries</h1>

        {/* ================= FORM ================= */}
        <form className="saved-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="country_name"
            placeholder="Country"
            value={formData.country_name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
          />

          <button type="submit">Save Country</button>
        </form>

        {/* RESPONSE MESSAGE */}
        {message && <p>{message}</p>}
      </div>

      {/* ================= SAVED COUNTRIES GRID ================= */}
      <div className="countries-grid">
        {savedCountries.map((item, index) => (
          <div className="country-card" key={index}>
            <h2>{item.country_name}</h2>
          </div>
        ))}
      </div>

    </div>
  );
}

export default SavedCountries;

 

// import { useEffect, useState } from "react";

// function SavedCountries({ countries = [] }) {
//   const [savedCountries, setSavedCountries] = useState([]);

//   // ======================
//   // 🔶 GET SAVED COUNTRIES
//   // ======================
//   useEffect(() => {
//     const fetchSavedCountries = async () => {
//       try {
//         const response = await fetch(
//           "https://backend-answer-keys.onrender.com/get-all-saved-countries"
//         );

//         const data = await response.json();
//         setSavedCountries(data);

//       } catch (error) {
//         console.log("Error fetching saved countries:", error);
//       }
//     };

//     fetchSavedCountries();
//   }, []);

//   // ======================
//   // 🔶 POST (FORM / SAVE COUNTRY)
//   // ======================
//   // This is included to match assignment requirement,
//   // even if your main save button is in CountryDetail
//   const handleAddCountry = async (countryName) => {
//     try {
//       await fetch(
//         "https://backend-answer-keys.onrender.com/save-one-country",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             country_name: countryName
//           })
//         }
//       );

//       // Optional: refresh list after saving
//       const updated = await fetch(
//         "https://backend-answer-keys.onrender.com/get-all-saved-countries"
//       );

//       const data = await updated.json();
//       setSavedCountries(data);

//     } catch (error) {
//       console.log("Error saving country:", error);
//     }
//   };

//   // ======================
//   // MATCH BACKEND DATA → FULL COUNTRY OBJECTS
//   // ======================
//   const fullSavedCountries = savedCountries
//     .map(saved =>
//       countries.find(c => c.name.common === saved.country_name)
//     )
//     .filter(Boolean);

//   // ======================
//   // UI
//   // ======================
//   if (!fullSavedCountries.length) {
//     return <div>No saved countries yet</div>;
//   }

//   return (
//     <div className="saved-countries">

//       <h1>Saved Countries</h1>

//       {/* Example FORM (matches “form data” requirement in worksheet) */}
//       <div>
//         <button onClick={() => handleAddCountry("Japan")}>
//           Save Japan (Test Button)
//         </button>
//       </div>

//       <div className="saved-grid">

//         {fullSavedCountries.map((country) => (
//           <div key={country.cca3} className="card">

//             <h3>{country.name.common}</h3>

//             <img
//               src={country.flags?.svg}
//               alt={country.name.common}
//               width="120"
//             />

//             <p>{country.region}</p>

//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }

// export default SavedCountries;