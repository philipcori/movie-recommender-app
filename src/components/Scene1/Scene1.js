import React from "react";
import * as d3 from "d3";
import * as d3Annotation from "d3-svg-annotation";
import "./Scene1.css";

export const Scene1 = () => {
  const width = 600,
    height = 200;
  createBarGraph(height, width);
  return (
    <div className="scene1 center">
      <h1>Which guns are used the most?</h1>
      <div className="bar-chart">
        <svg width={1000} height={400}></svg>
      </div>
    </div>
  );
};

const createBarGraph = async (height, width) => {
  const data = await d3.csv(
    "https://narrative-vis-data.s3.us-west-2.amazonaws.com/bar_graph.csv",
    (d) => {
      d.num_used = parseInt(d.num_used);
      return d;
    }
  );
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 150,
  };

  const gunTypes = data.map((elt) => elt.gun_type);
  const xScale = d3.scaleBand().domain(gunTypes).range([0, width]);

  const maxVal = d3.max(data.map((elt) => elt.num_used));
  const yScale = d3.scaleLinear().domain([0, maxVal]).range([height, 0]);

  const svg = d3.select("svg");

  // Add y axis
  const yAxis = d3.axisLeft().scale(yScale);
  // // .tickValues([10, 20, 50, 100])
  // // .tickFormat(d3.format("~s"));
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(yAxis);
  svg
    .append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "end")
    // .attr("y", 10)
    .attr("dy", "50px")
    // .attr("dx", "100px")
    .attr("transform", "rotate(-90) translate(-100,40)")
    .text("# cases used");

  // Add x axis
  const xAxis = d3.axisBottom().scale(xScale);
  // .tickValues([10, 20, 50, 100])
  // .tickFormat(d3.format("~s"));
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr(
      "transform",
      "translate(" + margin.left + "," + (height + margin.top) + ")"
    )
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  const g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const tooltip = d3.select("body").append("div").attr("class", "toolTip");
  const totalNumUsed = d3.sum(data.map((elt) => elt.num_used));

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
    })
    .on("mouseover", function (event, d) {
      tooltip
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY}px`)
        .style("display", "inline-block")
        .html(
          `<p>${d.gun_type}s are used in ${(
            (d.num_used / totalNumUsed) *
            100
          ).toFixed(2)}% of cases</p>`
        );
    })
    .on("mouseout", function (d) {
      tooltip.style("display", "none");
    });

  //Add annotations
  const annotations = [
    {
      data: { gun_type: "Handgun", num_used: 25048 },
      dy: -10,
      dx: -10,
      className: "show-bg",
    },
  ].map((l) => {
    l.note = Object.assign({}, l.note, {
      title: `${l.data.gun_type}s are used in ${(
        (l.data.num_used / totalNumUsed) *
        100
      ).toFixed(1)}% of cases.`,
      // label: `hello`,
      bgPadding: 20,
    });
    return l;
  });

  const makeAnnotations = d3Annotation
    .annotation()
    .type(d3Annotation.annotationLabel)
    .accessors({
      x: (d) => xScale(d.gun_type) + margin.left,
      y: (d) => yScale(d.num_used) + margin.top,
    })
    .accessorsInverse({
      gun_type: (d) => xScale.invert(d.x),
      num_used: (d) => yScale.invert(d.y),
    })
    .annotations(annotations)
    .on("subjectover", function (annotation) {
      annotation.type.a
        .selectAll("g.annotation-connector, g.annotation-note")
        .classed("hidden", false);
    })
    .on("subjectout", function (annotation) {
      annotation.type.a
        .selectAll("g.annotation-connector, g.annotation-note")
        .classed("hidden", true);
    });

  svg.append("g").attr("class", "annotation-group").call(makeAnnotations);
  svg
    .selectAll("g.annotation-connector, g.annotation-note")
    .classed("hidden", true);
};
