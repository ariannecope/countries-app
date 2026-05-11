import CountryCard from "../components/CountryCard";

function Home({ countriesData }) {
  return (
    <div className="countries-container">
      {countriesData.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
        />
      ))}
    </div>
  );
}

export default Home;

// function Home({ countriesData }) This is the same data you passed from App.jsx.

// countriesData.map((country) => ( ... )) Each country is one object from your dataset.

// You render a card for each one <CountryCard country={country} />

// key={country.cca3}  React needs a unique key for each item, cca3 is perfect (it’s a unique country code)