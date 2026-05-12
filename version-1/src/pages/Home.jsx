import CountryCard from "../components/CountryCard";
import { useState } from "react";

function Home({ countriesData }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Sort countries A → Z
  const sortedCountries = [...countriesData].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );

  // Filter based on search input
  const filteredCountries = sortedCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar */}
      <input
        className="search-input"
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Countries Grid */}
      <div className="countries-container">
        {filteredCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}

export default Home;


// function Home({ countriesData }) This is the same data you passed from App.jsx.

// countriesData.map((country) => ( ... )) Each country is one object from your dataset.

// You render a card for each one <CountryCard country={country} />

// key={country.cca3}  React needs a unique key for each item, cca3 is perfect (it’s a unique country code)