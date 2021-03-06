import React, { useEffect, useState } from "react";
import "./RatingsRecommender.css";
import { API } from "aws-amplify";
import { Constants } from "../../util/Constants";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import MovieRater from "../MovieRater";
import RecPage from "../RecPage";

const TOTAL_NUM_MOVIES = 500;

const RatingsRecommender = () => {
  const [ratings, setRatings] = useState([]);
  const [movieIds, setMovieIds] = useState([]);
  const [recsLoading, setRecsLoading] = useState(false);
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    // load popular movies
    fetch("/pop_movies.txt")
      .then((r) => r.text())
      .then((text) => {
        let movieIds = text.split("\n");
        movieIds = movieIds.slice(0, TOTAL_NUM_MOVIES);
        const newArr = [];
        for (let i = 0; i < TOTAL_NUM_MOVIES - 5; i += 5) {
          newArr.push(movieIds.slice(i, i + 5));
        }
        setMovieIds(newArr);
      });
    // API.get(Constants.API, "/get_msg", {}).then((res) => console.log(res));
    // API.post(Constants.API, "/echo", {
    //   body: {
    //     name: "Philip",
    //   },
    // }).then((res) => console.log(res));
  }, []);

  const getRecs = () => {
    setRecsLoading(true);
    API.get(Constants.API, "/system2/get_recs", {
      queryStringParameters: {
        ratings: JSON.stringify(ratings),
      },
    }).then((res) => {
      setRecsLoading(false);
      setRecs(res.recs);
      console.log(res);
    });
  };

  const handleRateMovie = (nextValue, prevValue, name) => {
    const idx = ratings.findIndex((rating) => rating.movieId === name);
    const newRatings = ratings.slice();
    if (idx > -1) {
      newRatings[idx].rating = nextValue;
      setRatings(newRatings);
      return;
    }
    newRatings.push({
      movieId: name,
      rating: nextValue,
    });
    setRatings(newRatings);
  };

  return (
    <div className="App">
      <h3>Rate as many movies as possible</h3>
      <div className="ratings-recommender">
        <Container className="container">
          {movieIds.map((row) => {
            return (
              <Row>
                <Col>
                  <MovieRater movieId={row[0]} handleClick={handleRateMovie} />
                </Col>
                <Col>
                  <MovieRater movieId={row[1]} handleClick={handleRateMovie} />
                </Col>
                <Col>
                  <MovieRater movieId={row[2]} handleClick={handleRateMovie} />
                </Col>
                <Col>
                  <MovieRater movieId={row[3]} handleClick={handleRateMovie} />
                </Col>
                <Col>
                  <MovieRater movieId={row[4]} handleClick={handleRateMovie} />
                </Col>
              </Row>
            );
          })}
        </Container>
      </div>
      {ratings.length > 0 ? (
        <Button onClick={getRecs} style={{ marginTop: "30px" }}>
          Get Recommendations
        </Button>
      ) : (
        <Button onClick={getRecs} style={{ marginTop: "30px" }} disabled>
          Get Recommendations
        </Button>
      )}

      <div className="rec-section" style={{ marginTop: "30px" }}>
        {recsLoading && <Spinner animation="border" />}
        {recs.length > 0 && <RecPage recs={recs} />}
      </div>
    </div>
  );
};

export default RatingsRecommender;
