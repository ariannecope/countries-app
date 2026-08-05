import CountryCard from "../components/CountryCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ countriesData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const navigate = useNavigate();

  // Picks a random country and navigates to its detail page.
  // Uses the full countriesData (not filteredCountries) on purpose, so the
  // random pick always covers every country regardless of the current
  // search/region filters.
  const handleRandomCountry = () => {
    // Guard against an empty array (e.g. countries API hasn't loaded yet,
    // or the fetch failed) — Math.random() * 0 would otherwise look up
    // index 0 of an empty array and silently do nothing.
    if (!countriesData.length) return;

    const randomIndex = Math.floor(Math.random() * countriesData.length);
    const randomCountry = countriesData[randomIndex];

    // Same fallback CountryCard uses for its link, so this stays consistent
    // if a country is ever missing alpha2Code.
    navigate(`/country/${randomCountry.alpha2Code || randomCountry.name}`);
  };

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

      {/* Random Country Button */}
      {/* Disabled while countries are still loading so clicking never silently no-ops */}
      <button
        className="random-button"
        onClick={handleRandomCountry}
        disabled={!countriesData.length}
        title={
          countriesData.length
            ? "Jump to a random country"
            : "Loading countries..."
        }
      >
        🎲 Random Country
      </button>

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