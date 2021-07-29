import React from "react";
import { Card } from "react-bootstrap";

export const Intro = () => {
  return (
    <div className="Intro">
      <h1>Gun Violence in the United States</h1>
      <br />
      <Card>
        <Card.Body>
          <Card.Text>
            The following data accounts for gun violence incidents in the years
            2013 - 2018 in the United States
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
