import { useEffect, useState } from 'react';

// Import React Router tools
// Routes = container for all routes
// Route = individual route
// Link = navigation links
import { Routes, Route, Link } from 'react-router-dom';
// Import page components
import Home from './pages/Home';
import SavedCountries from './pages/SavedCountries';
import CountryDetail from './pages/CountryDetail';
// Import backup local data
// Used if the API fails
import localData from './localData';

function App() {
    // State for dark/light mode
  // Starts as false = light mode
  const [darkMode, setDarkMode] = useState(false);

  // State to store all countries data
  // Starts as empty array until API loads
  const [countries, setCountries] = useState([]);

  // State to store user's saved countries
  const [savedCountries, setSavedCountries] = useState([]);

  // Async function to fetch country data from API
  // fields= limits which data we receive
  const getCountriesData = async () => {
    try {
      const response = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders'
      );
// If response fails, manually throw an error
      if (!response.ok) {
        throw new Error('API response not OK');
      }

      const data = await response.json();

      console.log('API data loaded');
      // Store API data into countries state
      setCountries(data);

    } catch (error) {
      // If API fails, use local backup data instead
      console.error('API failed, using local data instead:', error);
      setCountries(localData);
    }
  };

  // useEffect runs after component renders
  // Empty dependency array [] means:
  // "Run only once when the app first loads"
  useEffect(() => {
    getCountriesData();
  }, []);

  return (
    <div>
      {/* Navigation bar */}
      <nav className="navbar">

   {/* Link to homepage */}
  <Link to="/" className="nav-left">
    Where in the World?
  </Link>

  <div className="nav-right">
  {/* Link to saved countries page */}
    <Link to="/saved">
      Saved Countries
    </Link>

{/* Toggle dark/light mode */}
    <button onClick={() => setDarkMode(!darkMode)}>
        {/* Ternary operator:
        If darkMode is true -> show "Light Mode"
        Otherwise -> show "Dark Mode"*/}
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  </div>
</nav>
 {/* All app routes */}
      <Routes>
        {/* Homepage route */}
        <Route path="/" element={<Home countriesData={countries} />} />
        {/* Saved countries page */}
        <Route path="/saved" element={<SavedCountries />} />
        {/* Country detail page */}
        {/* :code is a dynamic URL parameter */}
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

