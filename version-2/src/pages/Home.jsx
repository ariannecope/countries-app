import CountryCard from "../components/CountryCard";
import { useState } from "react";

function Home({ countriesData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  // Sort countries A → Z
  const sortedCountries = [...countriesData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Filter based on search input and also for region
  const filteredCountries = sortedCountries.filter((country) => {
    // this checks “Does the country name include the typed text?”
    const matchesSearch = (country.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // region filter--if no region selected ("") → allow everything
    // otherwise → only allow matching regions
    const matchesRegion =
      selectedRegion === "" || country.region === selectedRegion;

    // final return--“Only keep countries that pass BOTH filters.”
    return matchesSearch && matchesRegion;
  });

  return (
    <div>
      {/* drop down for region filter */}
      <div className="filter-container">
        <label htmlFor="region-filter">Filter by Region</label>

        <select
          id="region-filter"
          value={selectedRegion}
          onChange={(event) => setSelectedRegion(event.target.value)}
        >
          <option value="">All Regions</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctic</option>
        </select>
      </div>

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
        {filteredCountries.map((country) => {
 
          return (
            <CountryCard
              key={country.alpha2Code || country.name}
              country={country}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;

// function Home({ countriesData }) This is the same data you passed from App.jsx.

// countriesData.map((country) => ( ... )) Each country is one object from your dataset.

// You render a card for each one <CountryCard country={country} />

// key={country.cca3}  React needs a unique key for each item, cca3 is perfect (it’s a unique country code)