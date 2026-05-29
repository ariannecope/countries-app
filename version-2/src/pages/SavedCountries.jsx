

import { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard";

function SavedCountries({ countries, savedCountries }) {
  const [formData, setFormData] = useState({
    name: "",
    country_name: "",
    email: "",
    bio: ""
  });

  const [message, setMessage] = useState("");

//Go through every country, Keep everything whose name exists in the saved list
    const savedCountryObjects = countries.filter(country =>
    savedCountries.includes(country.name)
  );

const getSavedCountries = async () => {
  try {
    const response = await fetch("/api/get-all-saved-countries");
    const data = await response.json();

    setSavedCountries(data.map(item => item.country_name));
  } catch (error) {
    console.log("Error:", error.message);
  }
};

  console.log("savedCountries:", savedCountries);
console.log("countries:", countries);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/add-one-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

const data = await response.json();
setMessage(data);

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
        <CountryCard key={country.name} country={country} />
      ))}
    </div>

    </div>
  );
}

export default SavedCountries;

// import { useState, useEffect } from "react";

// function SavedCountries() {
//   // =========================
//   // STATE
//   // =========================
// //state for POST form
//   const [formData, setFormData] = useState({
//     name: "",
//     country_name: "",
//     email: "",
//     bio: ""
//   });
// //state for the message displayed back to user after submitting form
//   const [message, setMessage] = useState("");
//   //state for saved countries
//   const [savedCountries, setSavedCountries] = useState([]);

//   // =========================
//   // GET SAVED COUNTRIES
//   // =========================

//   const getSavedCountries = async () => {
//     try {
//       const response = await fetch(
//         "/api/get-all-saved-countries"
//       );

//       const data = await response.json();
//       setSavedCountries(data);
//     } catch (error) {
//       console.log("Error:", error.message);
//     }
//   };

//    //After the component renders, call getSavedCountries, when the page loads, run this function once
//   useEffect(() => {
//     getSavedCountries();
//   }, []);

//   // =========================
//   // FORM HANDLERS
//   // =========================
//   //This function updates your formData state whenever the user types into an input field.

//   //setFormData({ --updates your state.
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };
// //POST request for posting user's form entry 
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         "/api/add-one-user",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(formData)
//         }
//       );

//       const data = await response.json();
//       setMessage(data);
// //Now that we successfully added something, go get the updated list. After the POST adds a new saved country/user entry to the database, your frontend needs to refresh the displayed list so the new data appears on the page. So the POST and GET are working together: POST changes the data, GET retrieves the updated data
//       getSavedCountries();
// //resets the form-clearing the fields on the UI
//       setFormData({
//         name: "",
//         country_name: "",
//         email: "",
//         bio: ""
//       });
//     } catch (error) {
//       console.log("Error:", error.message);
//     }
//   };
// console.log(savedCountries);
//   // =========================
//   // JSX
//   // =========================
//   return (
//     <div className="saved-container">

//       <div className="page-wrapper">
//         <h1>Saved Countries</h1>

//         {/* ================= FORM ================= */}
//         <form className="saved-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//           />

//           <input
//             type="text"
//             name="country_name"
//             placeholder="Country"
//             value={formData.country_name}
//             onChange={handleChange}
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />

//           <textarea
//             name="bio"
//             placeholder="Bio"
//             value={formData.bio}
//             onChange={handleChange}
//           />

//           <button type="submit">Save Country</button>
//         </form>

//         {/* RESPONSE MESSAGE */}
//         {message && <p>{message}</p>}
//       </div>

//       {/* ================= SAVED COUNTRIES GRID ================= 
// savedCountries array
// → loop each item
// → create a <div> for each one
// → key helps React track each <div>
// So the key belongs to the thing being repeated — not the container (countries-grid), and not inside child components.

// .map() → creates list items
// props → pass data into components
// . notation → read object values
// key → helps React track list items internally*/}
// <div className="countries-grid">
//   {savedCountries.map((item) => (
//     <div key={item.country_name} className="country-card">
//       <h2>{item.country_name}</h2>
//     </div>
//   );
// </div>
//   );
// }

// export default SavedCountries;
