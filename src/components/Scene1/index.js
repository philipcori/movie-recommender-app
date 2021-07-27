import React from "react";
import * as d3 from "d3";
import "./Scene1.css";
import { barGraphPath } from "../../constants/dataPaths";
// import as from "components/";

export const Scene1 = () => {
  const width = 800,
    height = 300;
  createBarGraph(height, width);
  return (
    <div className="scene1 center">
      <h1>Which guns are used the most?</h1>
      <div className="bar-chart">
        <svg width={1000} height={500}></svg>
      </div>
    </div>
  );
};

const createBarGraph = async (height, width) => {
  const data = await d3.csv(barGraphPath, (d) => {
    d.num_used = parseInt(d.num_used);
    return d;
  });
  const margin = 50;

  const gunTypes = data.map((elt) => elt.gun_type);
  const xScale = d3.scaleBand().domain(gunTypes).range([0, width]);

  const maxVal = d3.max(data.map((elt) => elt.num_used));
  const yScale = d3.scaleLinear().domain([0, maxVal]).range([height, 0]);

  const svg = d3.select("svg");
  // .attr("transform", "translate(" + margin + "," + margin + ")");

  // Add y axis
  const yAxis = d3.axisLeft().scale(yScale);
  // // .tickValues([10, 20, 50, 100])
  // // .tickFormat(d3.format("~s"));
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + margin + "," + margin + ")")
    .call(yAxis);

  // Add x axis
  const xAxis = d3.axisBottom().scale(xScale);
  // .tickValues([10, 20, 50, 100])
  // .tickFormat(d3.format("~s"));
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(" + margin + "," + (height + margin) + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  const g = svg
    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")");
  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return xScale(d.gun_type);
    })
    .attr("y", function (d) {
      return yScale(d.num_used);
    })
    .attr("width", 20)
    .attr("height", function (d) {
      return height - yScale(d.num_used);
    });
};
