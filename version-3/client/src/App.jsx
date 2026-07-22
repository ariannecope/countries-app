/*
  App.jsx
  Main component for the Countries App.

  Responsibilities:
  - Stores global application state
  - Fetches country data from APIs
  - Controls dark mode
  - Sets up page navigation using React Router
  - Passes data and functions down to child components
*/


import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import SavedCountries from './pages/SavedCountries';
import CountryDetail from './pages/CountryDetail';



function App() {


  /*
    STATE

    darkMode:
    Controls whether the app uses light or dark styling.

    countries:
    Stores the full list of countries fetched from the API.

    savedCountries:
    Stores countries the user has saved in the database.
  */

  const [darkMode, setDarkMode] = useState(false);

  const [countries, setCountries] = useState([]);

  const [savedCountries, setSavedCountries] = useState([]);



  /*
    API REQUEST:
    Get all countries from countries.dev API.

    Flow:
    1. Send GET request
    2. Convert response into JSON
    3. Store data in countries state
  */

  const getCountriesData = async () => {

    try {

      const response = await fetch(
        "https://countries.dev/countries"
      );

      const data = await response.json();

      setCountries(data);

    } catch (error) {

      console.error("Countries API error:", error);

    }

  };



  /*
    API REQUEST:
    Get saved countries from our own backend.

    Flow:
    React frontend
        ↓
    Express route:
    /api/get-all-saved-countries
        ↓
    Database query
        ↓
    Saved countries returned as JSON
  */

  const getSavedCountries = async () => {

    try {

      const response = await fetch(
        "/api/get-all-saved-countries"
      );


      if (!response.ok) {

        throw new Error(
          "Saved countries API not available"
        );

      }


      const data = await response.json();


      /*
        Database returns objects.

        Example:
        [
          {
            country_name: "France"
          }
        ]

        The app only needs the names,
        so convert objects into an array of strings.
      */

      setSavedCountries(

        Array.isArray(data)

          ? data.map(item => item.country_name)

          : []

      );


    } catch (error) {


      console.error(
        "Saved countries API failed:",
        error
      );


      /*
        Prevents the app from crashing
        if backend/database is unavailable.
      */

      setSavedCountries([]);

    }

  };



  /*
    useEffect runs after the component renders.

    Empty dependency array [] means:
    "Run this only once when the app first loads."

    This gets our initial data.
  */

  useEffect(() => {

    getCountriesData();

    getSavedCountries();

  }, []);




  return (

    /*
      Applies dark mode class conditionally.

      If darkMode is true:
        class="app dark"

      Otherwise:
        class="app"
    */

    <div className={darkMode ? "app dark" : "app"}>

{/* 
      /*
        NAVBAR

        Link changes pages without refreshing
        the browser because React Router handles navigation.
      */}

      <nav className="navbar">


        <Link to="/">
          Where in the World?
        </Link>


        <div>

          <Link to="/saved">
            Saved Countries
          </Link>


          <button
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle Theme
          </button>


        </div>


      </nav>


{/* 
        ROUTING

        Determines which component appears
        based on the URL.

        Example:

        "/" 
        → Home page

        "/saved"
        → Saved countries page

        "/country/:code"
        → Individual country detail page
      */}

      <Routes>


        <Route

          path="/"

          element={
            <Home countriesData={countries} />
          }

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

