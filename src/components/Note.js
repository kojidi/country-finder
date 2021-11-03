import React, { useState } from "react";
import "./Note.css";

const Note = (props) => {
  const [btnInfo, setBtnInfo] = useState("");

  const showHandler = (info) => {
    setBtnInfo(info);
    props.handleShow();
  };

  return (
    <div className="results-container">
      <div className="list-result">
        <ul>
          {props.result.length > 10 && !props.showOnBtn && (
            <li className="error-list">Please Enter More Character</li>
          )}

          {props.result.length < 10 &&
            props.result.length > 1 &&
            !props.showOnBtn &&
            props.result.map((res) => (
              <li className="top-ten-list" key={Math.random()}>
                <p>{res.name.common}</p>
                {/* {setBtnInfo(res)} */}
                <button
                  onClick={() => {
                    // const data = res;
                    // setBtnInfo(res);
                    showHandler(res);
                    // console.log(btnInfo);
                  }}
                  className="show-btn"
                >
                  Show
                </button>
              </li>
            ))}
        </ul>
      </div>

      {props.result.length === 1 &&
        !props.showOnBtn &&
        props.result.map((res) => (
          <div key={Math.random()} className="single-result">
            <div className="result-information">
              <h2 className="title">{res.name.common}</h2>

              {res.capital && (
                <p>
                  <strong>Capital: </strong> {res.capital[0]}
                </p>
              )}

              <p>
                <strong>Region: </strong> {res.region}
              </p>

              <p>
                <strong>Population: </strong>{" "}
                {Number(res.population).toLocaleString()}
                {/* .toLocaleString() */}
              </p>
              <a href={res.maps.googleMaps} target="_blank">
                <strong>{res.name.common} Map</strong>
              </a>
            </div>
            <div className="result-image">
              <img src={res.flags.png} alt={res.name.common + " image"} />
            </div>
          </div>
        ))}

      {props.showOnBtn && (
        <div className="single-result">
          <div className="result-information">
            <h2 className="title">{btnInfo.name.common}</h2>
            {btnInfo.capital && (
              <p>
                <strong>Capital: </strong> {btnInfo.capital[0]}
              </p>
            )}

            <p>
              <strong>Region: </strong> {btnInfo.region}
            </p>

            <p>
              <strong>Population: </strong>{" "}
              {Number(btnInfo.population).toLocaleString()}
            </p>

            <a href={btnInfo.maps.googleMaps} target="_blank">
              <strong>{btnInfo.name.common} Map</strong>
            </a>
          </div>
          <div className="result-image">
            <img src={btnInfo.flags.png} alt={btnInfo.name.common + " image"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
