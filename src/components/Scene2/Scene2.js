import React from "react";
import * as d3 from "d3";

export const Scene2 = () => {
  const width = 600,
    height = 200;
  createChoropleth();
  return (
    <div className="scene1 center">
      <h1>Which states have the most gun violence?</h1>
      <div className="bar-chart">
        <svg width={1000} height={400}></svg>
      </div>
    </div>
  );
};

const createChoropleth = async () => {
  const data = await d3.csv(
    "https://narrative-vis-data.s3.us-west-2.amazonaws.com/choropleth.csv",
    (d) => {
      d.counts = parseInt(d.counts);
      console.log(d);
      return d;
    }
  );
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 150,
  };
};
