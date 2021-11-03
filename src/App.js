import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";
import "./App.css";
import spinnerGif from "./assets/img/spinner.gif";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [countries, setCountries] = useState([]);
  const [showOff, setShowOff] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const handleShow = () => {
    setShowOff(true);
  };

  const inputHandler = (event) => {
    setInput(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const fetchCountries = () => {
    setSpinner(true);
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      setSpinner(false);
    });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    setShowOff(false);
    setResult([]);

    countries.map((country) => {
      if (input === "") {
        setResult([]);
      } else if (
        country.name.common.toLowerCase().includes(input.toLowerCase()) != false
      ) {
        setResult((prev) => [country, ...prev]);
      }
    });
  }, [input]);
  // console.log(result);

  return (
    <React.Fragment>
      {spinner && (
        <div className="firstLoadingOverlay">
          <img src={spinnerGif} alt="spinner" />
          <p>Please Wait</p>
        </div>
      )}
      <div className="app">
        <h1>Country Searching</h1>
        <div className="form-container">
          <form onSubmit={submitHandler}>
            <label htmlFor="country">Enter The Name of Country : </label>
            <input
              value={input}
              id="country"
              type="text"
              autoComplete="off"
              onChange={inputHandler}
            />
          </form>
          <Note showOnBtn={showOff} handleShow={handleShow} result={result} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
