import React from "react";
import "./App.css";
import { Scene1 } from "../Scene1/Scene1";
import { Scene2 } from "../Scene2/Scene2";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Intro } from "../Intro";
import * as d3 from "d3";

const App = () => {
  return (
    <div className="App">
      <Carousel onChange={disableTooltip}>
        <Intro />
        <Scene1 />
        <Scene2 />
      </Carousel>
    </div>
  );
};

const disableTooltip = () => {
  d3.selectAll(".toolTip").style("visibility", "hidden");
};

export default App;
