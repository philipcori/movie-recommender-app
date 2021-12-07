import React from "react";
import { Card } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import { Constants } from "../../util/Constants";

const MovieRater = (props) => {
  return (
    <>
      <Card style={{ margin: "10px" }}>
        <Card.Img
          variant="top"
          src={Constants.IMAGES_BASE_URL + props.movieId + ".jpg"}
        />
        <Card.Body>
          <StarRatingComponent
            name={props.movieId}
            onStarClick={props.handleClick}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default MovieRater;
