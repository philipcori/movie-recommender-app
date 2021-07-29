import React from "react";
import * as d3 from "d3";
import * as d3Annotation from "d3-svg-annotation";
import * as topojson from "topojson";
// import legend from "d3-color-legend";
import "./Scene2.css";

export const Scene2 = () => {
  const width = 600,
    height = 200;
  createChoropleth(width, height);
  return (
    <div className="scene2 center">
      <h1>Which states have the most gun violence?</h1>
      <div className="center">
        <svg id="scene2-svg"></svg>
      </div>
    </div>
  );
};

const createChoropleth = async (width, height) => {
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 150,
  };

  const data = await d3.csv(
    "https://narrative-vis-data.s3.us-west-2.amazonaws.com/choropleth.csv",
    (d) => {
      d.counts = parseInt(d.counts);
      d.fips = parseInt(d.fips);
      return d;
    }
  );
  const us = await d3.json("https://d3js.org/us-10m.v1.json");
  const svg = d3.select("#scene2-svg").attr("width", 580).attr("height", 400);
  // .attr("transform", "translateX(100)");

  const states = topojson.feature(us, us.objects.states);
  states.features.forEach((state) => {
    state.properties.counts = getCountsForFips(data, state.id);
    state.properties.state = getStateForFips(data, state.id);
  });
  const maxCounts = d3.max(data.map((elt) => elt.counts));
  const sumCounts = d3.sum(data.map((elt) => elt.counts));
  const color = d3.scaleQuantize([0, maxCounts], d3.schemeBlues[9]);
  const tooltip = d3.select(".toolTip");

  const path = d3.geoPath();
  const stateBodies = svg
    .append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(states.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", (d) => color(d.properties.counts))
    .on("mouseover", (event, d) => {
      tooltip
        .style("visibility", "visible")
        .html(
          `<p>${((d.properties.counts / sumCounts) * 100).toFixed(
            2
          )}% of cases occurred in ${d.properties.state}</p>`
        );
    })
    .on("mousemove", function (event, d) {
      console.log("x: " + event.pageX);
      console.log("y: " + event.pageY);
      tooltip
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY}px`);
    });

  svg
    .append("path")
    .attr("class", "state-borders")
    .attr(
      "d",
      path(
        topojson.mesh(us, us.objects.states, function (a, b) {
          return a !== b;
        })
      )
    );

  const legendTitle = "Number of gun violence cases";
  const legend = svg
    .selectAll(".legendEntry")
    .data(color.range().reverse())
    .enter()
    .append("g")
    .attr("class", "legendEntry")
    .attr("transform", "translate(360,100)");

  legend
    .append("rect")
    .attr("x", 100)
    .attr("y", function (d, i) {
      return i * 20;
    })
    .attr("width", 10)
    .attr("height", 10)
    .style("stroke", "black")
    .style("stroke-width", 1)
    .style("fill", function (d) {
      return d;
    });

  legend
    .append("text")
    .attr("x", 120) //leave 5 pixel space after the <rect>
    .attr("y", function (d, i) {
      return i * 20;
    })
    .attr("dy", "0.8em") //place text one line *below* the x,y point
    .text(function (d, i) {
      var extent = color.invertExtent(d);
      //extent will be a two-element array, format it however you want:
      var format = d3.format("0.0f");
      return format(+extent[0]) + " - " + format(+extent[1]);
    })
    .style("font-size", "x-small");

  // Annotations

  const annotations = [
    {
      data: { state: "Illinois", counts: 17556 },
      dy: -10,
      dx: -90,
      className: "show-bg",
    },
  ].map((l) => {
    l.note = Object.assign({}, l.note, {
      title: `${((l.data.counts / sumCounts) * 100).toFixed(
        1
      )}% of cases occurred in Illinois.`,
      // label: `hello`,
      bgPadding: 20,
    });
    return l;
  });

  const makeAnnotations = d3Annotation
    .annotation()
    .type(d3Annotation.annotationLabel)
    .accessors({
      x: (d) => 305,
      y: (d) => 105,
    })
    // .accessorsInverse({
    //   gun_type: (d) => xScale.invert(d.x),
    //   num_used: (d) => yScale.invert(d.y),
    // })
    .annotations(annotations);

  svg.append("g").attr("class", "annotation-group").call(makeAnnotations);
};

const getCountsForFips = (data, fips) => {
  fips = parseInt(fips);
  return data.filter((d) => d.fips === fips)[0].counts;
};

const getStateForFips = (data, fips) => {
  fips = parseInt(fips);
  return data.filter((d) => d.fips === fips)[0].state;
};
