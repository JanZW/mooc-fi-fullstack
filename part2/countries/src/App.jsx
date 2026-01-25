import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetails = ({country}) => {
  return (
    <div>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital}<br/>
    Area: {country.area}</p>
    <h3>Languages</h3>
    <ul>
    {Object.keys(country.languages).map(lang => <li key={lang}>{country.languages[lang]}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
}

const Countries = ({ countries, filterString }) => {
  console.log('rendering Countries')
  if (countries == null) {
    return null;
  }
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterString.toLowerCase()),
  );

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches ({filteredCountries.length}), specify another filter</p>
    )
  }

  if (filteredCountries.length === 0) {
    return 'No Matches'
  }

  if (filteredCountries.length === 1) {
    return <CountryDetails country={filteredCountries[0]}/>
  }

  return filteredCountries.map((country) => (
    <li key={country.cca2}>{country.name.common}</li>
  ));
};

const App = () => {
  const [countries, setCountries] = useState(null);
  const [searchString, setSearchString] = useState("");

  const handleSearchString = (event) => {
    setSearchString(event.target.value);
  };
  useEffect(() => {
    console.log('effect')
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Countries</h1>
      find countries
      <input value={searchString} onChange={handleSearchString} />
      <br />
      <Countries countries={countries} filterString={searchString}/>
    </>
  );
};

export default App;
