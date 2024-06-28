import React, { useEffect, useState } from "react";
import Card from "../components/Cards/Cards";
import InputGroup from "../components/Filters/category/InputGroup";

// Episodes component for displaying episode details and characters
const Episodes = () => {
  
  // State variables for storing episode data and characters list
  let [results, setResults] = React.useState([]);
  let [info, setInfo] = useState([]);
  let { air_date, episode, name } = info;  //destructuring the episode info
  let [id, setID] = useState(1);  //state variable for id

  // API URL for fetching episode details based on selected ID
  let api = `https://rickandmortyapi.com/api/episode/${id}`;

  // Fetching episode details and characters data from API
  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      setInfo(data);

      let a = await Promise.all(
        data.characters.map((x) => {
          return fetch(x).then((res) => res.json());
        })
      );
      setResults(a);
    })();
  }, [api]);  // Dependencies array ensures useEffect runs when 'api' changes

  //rendering
  return (
    <div className="container">
      <div className="row mb-3">
        <h1 className="text-center mb-3">
          Episode name :{" "}
          <span className="text-primary">{name === "" ? "Unknown" : name}</span>
        </h1>
        <h5 className="text-center">
          Air Date: {air_date === "" ? "Unknown" : air_date}
        </h5>
      </div>
      <div className="row">
        <div className="col-lg-3 col-12 mb-4">
          <h4 className="text-center mb-4">Pick Episode</h4>
          <InputGroup name="Episode" changeID={setID} total={51} />
        </div>
        <div className="col-lg-8 col-12">
          <div className="row">
            <Card page="/episodes/" results={results} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episodes;