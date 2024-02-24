import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Select Country");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("Select State");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Select City");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (selectedCountry !== "Select Country") {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((response) => response.json())
        .then((data) => setStates(data));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState !== "Select State") {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((response) => response.json())
        .then((data) => setCities(data));
    }
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState("Select State");
    setSelectedCity("Select City");
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("Select City");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="App">
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option disabled>Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        value={selectedState}
        onChange={handleStateChange}
        disabled={selectedCountry === "Select Country"}
      >
        <option disabled>Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        onChange={handleCityChange}
        disabled={selectedState === "Select State"}
      >
        <option disabled>Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCity !== "Select City" &&
      selectedState !== "Select State" &&
      selectedCountry !== "Select Country" ? (
        <div>
          <p>{`You Selected ${selectedCity}, ${selectedState}, ${selectedCountry}`}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
