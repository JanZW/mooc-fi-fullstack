import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetails = ({ country }) => {
  if (country == null) {
    return null;
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        Capital: {country.capital}
        <br />
        Area: {country.area}
      </p>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map((lang) => (
          <li key={lang}>{country.languages[lang]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

const Countries = ({ countries, filterString, setSelectedCountry }) => {
  if (countries == null) {
    return null;
  }
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterString.toLowerCase()),
  );

  console.log(filteredCountries);

  if (filteredCountries.length > 10) {
    setSelectedCountry(null);
    return (
      <p>
        Too many matches ({filteredCountries.length}), specify another filter
      </p>
    );
  }

  if (filteredCountries.length === 0) {
    return "No Matches";
  }

  if (filteredCountries.length === 1) {
    setSelectedCountry(filteredCountries[0]);
    return null;
  }

  return (
    <>
      {filteredCountries.map((country) => (
        <div key={country.cca2}>
          <li>
            {country.name.common}{" "}
            <button
              onClick={(event) => {
                console.log(`show country ${country}`);
                setSelectedCountry(country);
              }}
            >
              Show
            </button>
          </li>
        </div>
      ))}
    </>
  );
};

const App = () => {
  const [countries, setCountries] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSearchString = (event) => {
    setSearchString(event.target.value);
    setSelectedCountry(null);
  };
  useEffect(() => {
    console.log("effect");
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(selectedCountry);

  return (
    <>
      <h1>Countries</h1>
      find countries
      <input value={searchString} onChange={handleSearchString} />
      <br />
      <Countries
        countries={countries}
        filterString={searchString}
        setSelectedCountry={setSelectedCountry}
      />
      <CountryDetails country={selectedCountry} />
    </>
  );
};

export default App;
