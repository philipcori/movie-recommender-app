import React from "react";
import "./App.css";
import { Scene1 } from "../Scene1";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Scene3 } from "components/Scene3";
import { Scene2 } from "components/Scene2";
import Content from "./App.styles";

const App = () => {
  return (
    <Content>
      <Carousel>
        <Scene1 />
        <Scene2 />
        <Scene3 />
      </Carousel>
    </Content>
    // <Carousel>
    // <Scene2 />
    // <Scene3 />
    // </Carousel>
  );
};

export default App;
