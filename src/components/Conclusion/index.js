import React from "react";
import { Card } from "react-bootstrap";

export const Conclusion = () => {
  return (
    <div className="Intro">
      <h1 style={{ marginBottom: "0px" }}>
        Putting things into perspective...
      </h1>
      <br />
      <ul
        style={{ display: "flex", flexDirection: "column", textAlign: "left" }}
      >
        <li style={{ listStyle: "none", padding: "5px", fontSize: "12px" }}>
          <Card>
            <Card.Body>
              <Card.Text style={{ fontSize: "10px" }}>
                As can be seen, the issue of gun violence is far from solved,
                resulting in more and more injuries and deaths every year. The
                following statistics can further put this issue into
                perspective:
              </Card.Text>
              <ul style={{ listStyle: "disc" }}>
                <li>
                  <Card.Text>
                    Every day, 316 people are shot in the United States. Of
                    those:
                    <ul style={{ listStyle: "disc" }}>
                      <li>
                        <Card.Text>106 people are shot and killed</Card.Text>
                      </li>
                      <li>
                        <Card.Text>210 survive gunshot injuries</Card.Text>
                      </li>
                      <li>
                        <Card.Text>
                          95 are intentionally shot by someone else and survive
                        </Card.Text>
                      </li>
                      <li>
                        <Card.Text>39 are murdered</Card.Text>
                      </li>
                      <li>
                        <Card.Text>64 die from gun suicide</Card.Text>
                      </li>
                    </ul>
                  </Card.Text>
                </li>
                <li>
                  <Card.Text>
                    There are 393 millions guns and 327 million people in the US
                  </Card.Text>
                </li>
                <li>
                  <Card.Text>
                    The NRA spends roughly $3 million per year on lobbying
                  </Card.Text>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </li>
        <li style={{ listStyle: "none", padding: "5px", fontSize: "10px" }}>
          <Card>
            <Card.Body>
              <Card.Text>
                Hopefully this data visualization story offered a fuller and
                more informed perspective on the issue of gun violence. Feel
                free to explore this issue further:
                <ul style={{ listStyle: "disc" }}>
                  <li>
                    <a href="https://www.bradyunited.org/key-statistics">
                      https://www.bradyunited.org/key-statistics
                    </a>
                  </li>
                  <li>
                    <a href="https://everytownresearch.org/issue/gun-violence-black-americans/">
                      https://everytownresearch.org/issue/gun-violence-black-americans/
                    </a>
                  </li>
                  <li>
                    <Card.Text>
                      <a href="https://www.bbc.com/news/world-us-canada-35261394">
                        https://www.bbc.com/news/world-us-canada-35261394
                      </a>
                    </Card.Text>
                  </li>
                  <li>
                    <a href="https://www.rd.com/article/gun-violence-statistics/">
                      https://www.rd.com/article/gun-violence-statistics/
                    </a>
                  </li>
                </ul>
              </Card.Text>
              <Card.Text>
                {"Dataset: "}
                <a href="https://www.kaggle.com/jameslko/gun-violence-data">
                  https://www.kaggle.com/jameslko/gun-violence-data
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </li>
      </ul>
    </div>
  );
};
