import React, { useState } from "react";
import "./GenreRecommender.css";
import { Dropdown, Spinner, DropdownButton, Button } from "react-bootstrap";
import API from "@aws-amplify/api";
import { Constants } from "../../util/Constants";
import RecPage from "../RecPage";

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Children's",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Film-Noir",
  "Horror",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western",
];

const GenreRecomender = () => {
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState([]);
  const [popImportance, setPopImportance] = useState(-1);

  const getRecs = () => {
    setLoading(true);
    API.get(Constants.API, "/system1/get_recs", {
      queryStringParameters: {
        num: 10,
        popularityImportance: parseInt(popImportance * 600, 10),
        genre: genre,
      },
    }).then((res) => {
      // console.log(res);
      setRecs(res.recs);
      setLoading(false);
    });
  };

  const handleSelect = (e) => {
    setGenre(e);
  };

  const handlePopImportance = (e) => {
    setPopImportance(e);
  };

  return (
    <div className="App">
      <div className="genre-recommender">
        {/* <h3 style={{ float: "left" }}>Genre Recommender</h3> */}
        <DropdownButton
          onSelect={handleSelect}
          title={genre !== "" ? `Genre: ${genre}` : "Select Genre"}
        >
          {GENRES.map((genre) => {
            return <Dropdown.Item eventKey={genre}>{genre}</Dropdown.Item>;
          })}
        </DropdownButton>
        <DropdownButton
          style={{ marginLeft: "50px" }}
          onSelect={handlePopImportance}
          title={
            popImportance === -1
              ? "Popularity Importance"
              : `Popularity Importance: ${popImportance}`
          }
        >
          {[...Array(6).keys()].map((num) => {
            return <Dropdown.Item eventKey={num}>{num}</Dropdown.Item>;
          })}
        </DropdownButton>
      </div>
      {genre === "" || popImportance === -1 ? (
        <Button onClick={getRecs} style={{ marginTop: "30px" }} disabled>
          Get Recommendations
        </Button>
      ) : (
        <Button onClick={getRecs} style={{ marginTop: "30px" }}>
          Get Recommendations
        </Button>
      )}

      <div className="rec-section" style={{ marginTop: "30px" }}>
        {loading && <Spinner animation="border" />}
        {recs.length > 0 && <RecPage recs={recs} />}
      </div>
    </div>
  );
};

export default GenreRecomender;
