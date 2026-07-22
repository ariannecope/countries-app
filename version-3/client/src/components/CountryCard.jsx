// Imports the Link component from React Router.
// Link lets us navigate to another page in our app without refreshing the browser.
import { Link } from "react-router-dom";


// Receives a single country object as a prop from the parent component.
// The country data comes from our API/backend.
function CountryCard({ country }) {

  // Safely gets the country's name.
  // If country or name doesn't exist, displays a fallback message.
  const name = country?.name || "Unknown Country";


  return (

    // Makes the entire card clickable.
    // When clicked, the user is taken to that country's detail page.
    // Uses the country's alpha2Code as the URL when available.
    // Falls back to the country name if alpha2Code doesn't exist.
    <Link to={`/country/${country?.alpha2Code || country?.name}`}>

      <div className="country-card">


        {/* 
          Displays the country's flag.
          Different APIs may store flag information differently,
          so we check multiple possible locations:
          1. flags.png
          2. flags.svg
          3. flag

          If no flag exists, show a placeholder image.
        */}
        <img
          src={
            country?.flags?.png ||
            country?.flags?.svg ||
            country?.flag ||
            "https://via.placeholder.com/150"
          }
          alt={`Flag of ${name}`}
        />


        {/* Displays basic country information */}
        <h2>{name}</h2>


        <p>
          <strong>Population:</strong>{" "}
          {country?.population ?? "N/A"}
        </p>


        <p>
          <strong>Region:</strong>{" "}
          {country?.region ?? "N/A"}
        </p>


        <p>
          <strong>Capital:</strong>{" "}
          {country?.capital ?? "N/A"}
        </p>


      </div>

    </Link>
  );
}


// Makes this component available to import into other files.
export default CountryCard;