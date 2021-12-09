import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Constants } from "../../util/Constants";

const RecPage = (props) => {
  const recsTo2DArray = (recs) => {
    const newArr = [];
    for (let i = 0; i <= recs.length - 5; i += 5) {
      newArr.push(recs.slice(i, i + 5));
    }
    return newArr;
  };

  const recs = recsTo2DArray(props.recs);
  return (
    <>
      <Container className="container">
        {recs.map((row) => {
          return (
            <Row>
              <Col>
                <Card style={{ margin: "10px" }}>
                  <Card.Img
                    variant="top"
                    src={Constants.IMAGES_BASE_URL + row[0] + ".jpg"}
                  />
                </Card>
              </Col>
              <Col>
                <Card style={{ margin: "10px" }}>
                  <Card.Img
                    variant="top"
                    src={Constants.IMAGES_BASE_URL + row[1] + ".jpg"}
                  />
                </Card>
              </Col>
              <Col>
                <Card style={{ margin: "10px" }}>
                  <Card.Img
                    variant="top"
                    src={Constants.IMAGES_BASE_URL + row[2] + ".jpg"}
                  />
                </Card>
              </Col>
              <Col>
                <Card style={{ margin: "10px" }}>
                  <Card.Img
                    variant="top"
                    src={Constants.IMAGES_BASE_URL + row[3] + ".jpg"}
                  />
                </Card>
              </Col>
              <Col>
                <Card style={{ margin: "10px" }}>
                  <Card.Img
                    variant="top"
                    src={Constants.IMAGES_BASE_URL + row[4] + ".jpg"}
                  />
                </Card>
              </Col>
            </Row>
          );
        })}
      </Container>
    </>
  );
};

export default RecPage;
