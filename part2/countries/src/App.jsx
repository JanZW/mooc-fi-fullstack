import axios from "axios";
import { useEffect, useState } from "react";
import weather from "./services/weather";

const Weather = ({ city }) => {
  const [weatherAtCapitol, setWeatherAtCapitol] = useState(null);

  if (city === null) {
    return null;
  }

  useEffect(() => {
    weather
      .getWeather({ city })
      .then((response) => {
        console.log(response.data);
        setWeatherAtCapitol(response.data);
      })
      .catch((e) => console.log(`Error while catching weather: ${e}`));
  }, [city]);

  if (weatherAtCapitol === null) {
    return null;
  }

  console.log(weatherAtCapitol)
  return (
    <>
      <h2>Weather in {city}</h2>
      <p>
        Temperature: {Math.round((weatherAtCapitol.main.temp - 273.15) * 10) / 10} °C
        (feels like {Math.round((weatherAtCapitol.main.feels_like - 273.15) * 10) / 10} °C)
      </p>
      <img
        src={`https://openweathermap.org/payload/api/media/file/${weatherAtCapitol.weather[0].icon}.png`}
        alt={weatherAtCapitol.weather.description}
      />
      <p>Wind: {weatherAtCapitol.wind.speed} m/s</p>
    </>
  );
};

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
      <br />
      <Weather city={country.capital} />
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

  if (filteredCountries.length > 10) {
    return (
      <p>
        Too many matches ({filteredCountries.length}), specify another filter
      </p>
    );
  }

  useEffect(() => {
    if (filteredCountries.length === 0) {
      setSelectedCountry(null);
    }
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    }
  }, [filteredCountries]);

  if (filteredCountries.length === 0) {
    return "No Matches";
  }

  if (filteredCountries.length === 1) {
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
  const [weatherIconURL, setWeatherIconUrl] = useState(null);

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
      <CountryDetails
        country={selectedCountry}
        weatherIconURL={weatherIconURL}
        setWeatherIconUrl={setWeatherIconUrl}
      />
    </>
  );
};

export default App;
