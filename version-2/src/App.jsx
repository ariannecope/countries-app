import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import SavedCountries from './pages/SavedCountries';
import CountryDetail from './pages/CountryDetail';

import localData from './localData';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [countries, setCountries] = useState([]);

  // ✅ IMPORTANT: store ONLY cca3 codes
  const [savedCountries, setSavedCountries] = useState([]);

  const getCountriesData = async () => {
    try {
      const response = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders'
      );

      if (!response.ok) {
        throw new Error('API response not OK');
      }

      const data = await response.json();

      console.log('API data loaded');
      setCountries(data);

    } catch (error) {
      console.error('API failed, using local data instead:', error);
      setCountries(localData);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <nav className="navbar">

        <Link to="/" className="nav-left">
          Where in the World?
        </Link>

        <div className="nav-right">

          <Link to="/saved">
            Saved Countries
          </Link>

          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

        </div>
      </nav>

      <Routes>

        <Route
          path="/"
          element={<Home countriesData={countries} />}
        />

        {/* ✅ FIXED: pass BOTH props */}
        <Route
          path="/saved"
          element={
            <SavedCountries
              countries={countries}
              savedCountries={savedCountries}
              setSavedCountries={setSavedCountries}
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

