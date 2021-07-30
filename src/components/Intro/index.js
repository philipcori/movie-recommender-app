import React from "react";
import { Card } from "react-bootstrap";

export const Intro = () => {
  return (
    <div className="Intro">
      <h1>Gun Violence in the United States</h1>
      <br />
      <ul
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
      >
        <li style={{ listStyle: "none", padding: "10px" }}>
          <Card>
            <Card.Body>
              <Card.Text style={{ fontSize: "15px" }}>
                Although the United States is one of the most developed nations
                in the world, it suffers worse than any other from gun violence.
                It affects hundreds of US citizens everyday, and
                disproportionately impacts people of color. Children are also
                not safe from the misuse of firearms. It remains a struggle to
                pass legislation to sufficiently address this widespread threat
                on human life.
              </Card.Text>
            </Card.Body>
          </Card>
        </li>
        <li style={{ listStyle: "none", padding: "10px" }}>
          <Card>
            <Card.Body>
              <Card.Text>
                The following data accounts for gun violence incidents in the
                years 2013 - 2018 in the United States. You will have an
                opportunity to explore what types of guns are used the most,
                which states have the worst rates of gun violence, and lastly
                how the rate of gun violence is changing over time.
              </Card.Text>
            </Card.Body>
          </Card>
        </li>
      </ul>
    </div>
  );
};
