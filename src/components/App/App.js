import React from "react";
import "./App.css";
import { Intro } from "../Intro";
import { Scene1 } from "../Scene1/Scene1";
import { Scene2 } from "../Scene2/Scene2";
import { Scene3 } from "../Scene3";
import { Conclusion } from "../Conclusion";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import * as d3 from "d3";

const App = () => {
  return (
    <div className="App">
      <Carousel onChange={disableTooltip} showArrows={true}>
        <Intro />
        <Scene1 />
        <Scene2 />
        <Scene3 />
        <Conclusion />
      </Carousel>
    </div>
  );
};

const disableTooltip = () => {
  d3.selectAll(".toolTip").style("visibility", "hidden");
};

export default App;
