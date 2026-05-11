import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SavedCountries from './pages/SavedCountries';
import CountryDetail from './pages/CountryDetail';
import localData from './localData';

function App() {
  return (
    <div>
<nav className="navbar">
  <Link to="/" className="nav-left">
    Where in the World?
  </Link>

  <Link to="/saved" className="nav-right">
    Saved Countries
  </Link>
</nav>

      <Routes>
        <Route path="/" element={<Home countriesData={localData} />} />
        <Route path="/saved" element={<SavedCountries />} />
        <Route path="/country/:name" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;

