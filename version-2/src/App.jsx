import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import SavedCountries from './pages/SavedCountries';
import CountryDetail from './pages/CountryDetail';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [countries, setCountries] = useState([]);
  const [savedCountries, setSavedCountries] = useState([]);

  // GET full countries list
//new API
  const getCountriesData = async () => {
  try {
    const response = await fetch("https://countries.dev/countries");
    const data = await response.json();
    setCountries(data);
  } catch (error) {
    console.error("Countries API error:", error);
  }
};
//old API
  // const getCountriesData = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders'
  //     );

  //     const data = await response.json();
  //     setCountries(data);

  //   } catch (error) {
  //     console.error("Countries API error:", error);
  //   }
  // };

  // GET saved countries (IMPORTANT MISSING PIECE)
  const getSavedCountries = async () => {
    try {
      const response = await fetch("/api/get-all-saved-countries");

      if (!response.ok) {
        throw new Error("Saved countries API not available");
      }

      const data = await response.json();

      // normalize to array of names
      setSavedCountries(
        Array.isArray(data)
          ? data.map(item => item.country_name)
          : []
      );

    } catch (error) {
      console.error("Saved countries API failed:", error);

      // safe fallback so app does NOT break rendering
      setSavedCountries([]);
    }
  };

//old API
  // useEffect(() => {
  //   getCountriesData();
  //   getSavedCountries(); // 🔥 THIS FIXES YOUR EMPTY STATE SAFELY
  // }, []);

//new API

useEffect(() => {
  getCountriesData();
  getSavedCountries();
}, []);

//old API
//   useEffect(() => {
//   const fetchCountries = async () => {
//     const res = await fetch("https://countries.dev/countries");
//     const data = await res.json();
//     setCountries(data);
//   };

//   fetchCountries();
// }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <nav className="navbar">
        <Link to="/">Where in the World?</Link>

        <div>
          <Link to="/saved">Saved Countries</Link>
          <button onClick={() => setDarkMode(!darkMode)}>
            Toggle Theme
          </button>
        </div>
      </nav>

      <Routes>

        <Route
          path="/"
          element={<Home countriesData={countries} />}
        />

        <Route
          path="/saved"
          element={
            <SavedCountries
              countries={countries}
              savedCountries={savedCountries}
              setSavedCountries={setSavedCountries}
              refreshSaved={getSavedCountries}
            />
          }
        />

        <Route
          path="/country/:code"
          element={
            <CountryDetail
              countries={countries}
              savedCountries={savedCountries}
              setSavedCountries={setSavedCountries}
            />
          }
        />

      </Routes>

    </div>
  );
}

export default App;

// import { useEffect, useState } from 'react';
// import { Routes, Route, Link } from 'react-router-dom';

// import Home from './pages/Home';
// import SavedCountries from './pages/SavedCountries';
// import CountryDetail from './pages/CountryDetail';

// function App() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [countries, setCountries] = useState([]);
//   const [savedCountries, setSavedCountries] = useState([]);

//   // GET full countries list
//   const getCountriesData = async () => {
//     try {
//       const response = await fetch(
//         'https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders'
//       );

//       const data = await response.json();
//       setCountries(data);

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // GET saved countries (IMPORTANT MISSING PIECE)
//   const getSavedCountries = async () => {
//     try {
//       const response = await fetch("/api/get-all-saved-countries");
//       const data = await response.json();

//       // normalize to array of names
//       setSavedCountries(data.map(item => item.country_name));

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getCountriesData();
//     getSavedCountries(); // 🔥 THIS FIXES YOUR EMPTY STATE
//   }, []);

//   return (
//     <div className={darkMode ? "app dark" : "app"}>

//       <nav className="navbar">
//         <Link to="/">Where in the World?</Link>

//         <div>
//           <Link to="/saved">Saved Countries</Link>
//           <button onClick={() => setDarkMode(!darkMode)}>
//             Toggle Theme
//           </button>
//         </div>
//       </nav>

//       <Routes>

//         <Route
//           path="/"
//           element={<Home countriesData={countries} />}
//         />

//         <Route
//           path="/saved"
//           element={
//             <SavedCountries
//               countries={countries}
//               savedCountries={savedCountries}
//               setSavedCountries={setSavedCountries}
//               refreshSaved={getSavedCountries}
//             />
//           }
//         />

//         <Route
//           path="/country/:code"
//           element={
//             <CountryDetail
//               countries={countries}
//               savedCountries={savedCountries}
//               setSavedCountries={setSavedCountries}
//             />
//           }
//         />

//       </Routes>

//     </div>
//   );
// }

// export default App;

