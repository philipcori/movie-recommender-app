import React from "react";
import * as d3 from "d3";
import * as d3Annotation from "d3-svg-annotation";

export const Scene3 = () => {
  const width = 400,
    height = 200;
  createLineGraph(width, height);
  return (
    <div className="scene3 center">
      <h1>How is gun violence changing over time?</h1>
      <div className="center">
        <svg id="scene3-svg"></svg>
      </div>
    </div>
  );
};

const createLineGraph = async (width, height) => {
  const data = await d3.csv(
    "https://narrative-vis-data.s3.us-west-2.amazonaws.com/line_graph2.csv",
    (d) => {
      d.n_killed = parseInt(d.n_killed);
      d.n_injured = parseInt(d.n_injured);
      d.counts = parseInt(d.counts);
      return d;
    }
  );
  const margin = {
    top: 70,
    right: 50,
    bottom: 50,
    left: 150,
  };

  const years = data.map((elt) => elt.year);
  const xScale = d3.scaleBand().domain(years).range([0, width]);
  const xAxis = d3.axisBottom().scale(xScale);

  const maxVal = d3.max(data.map((elt) => elt.counts));
  const yScale = d3.scaleLinear().domain([0, maxVal]).range([height, 0]);
  const yAxis = d3.axisLeft().scale(yScale);

  const svg = d3.select("#scene3-svg").attr("width", 650).attr("height", 400);

  // Add y axis & label
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(yAxis);
  svg
    .append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "end")
    .attr("dy", "50px")
    .attr("transform", "rotate(-90) translate(-130,40)")
    .text("Sum");

  // Add x axis & label
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr(
      "transform",
      "translate(" + margin.left + "," + (height + margin.top) + ")"
    )
    .call(xAxis);
  svg
    .append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", width - 40)
    .attr("y", height + 105)
    .text("Year");

  const g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const tooltip = d3.select(".toolTip");

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("id", "counts-line")
    .attr(
      "d",
      d3
        .line()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.counts))
    );
  g.selectAll("#counts-line").style("stroke", "steelblue");

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("id", "n_killed-line")
    .attr(
      "d",
      d3
        .line()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.n_killed))
    );
  g.selectAll("#n_killed-line").style("stroke", "red");

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("id", "n_injured-line")
    .attr(
      "d",
      d3
        .line()
        .x((d) => xScale(d.year))
        .y((d) => yScale(d.n_injured))
    );
  g.selectAll("#n_injured-line").style("stroke", "orange");

  // Points
  g.append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.year);
    })
    .attr("cy", function (d) {
      return yScale(d.counts);
    })
    .attr("r", 2)
    .attr("id", "counts-circle");
  g.append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.year);
    })
    .attr("cy", function (d) {
      return yScale(d.n_injured);
    })
    .attr("r", 2)
    .attr("id", "n_injured-circle");

  g.append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.year);
    })
    .attr("cy", function (d) {
      return yScale(d.n_killed);
    })
    .attr("r", 2)
    .attr("id", "n_killed-circle");

  const bandWidth = xScale.bandwidth() / 2;
  g.selectAll("path").attr("transform", `translate(${bandWidth},0)`);
  g.selectAll("#counts-circle")
    .style("fill", "black")
    .attr("transform", `translate(${bandWidth},0)`)
    .on("mouseover", (event, d) => {
      tooltip
        .style("visibility", "visible")
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY}px`)
        .html(`<p># Cases: ${d.counts}</p>`);
    });
  g.selectAll("#n_injured-circle")
    .style("fill", "black")
    .attr("transform", `translate(${bandWidth},0)`)
    .on("mouseover", (event, d) => {
      tooltip
        .style("visibility", "visible")
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY}px`)
        .html(`<p># Injured: ${d.n_injured}</p>`);
    });
  g.selectAll("#n_killed-circle")
    .style("fill", "black")
    .attr("transform", `translate(${bandWidth},0)`)
    .on("mouseover", (event, d) => {
      tooltip
        .style("visibility", "visible")
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY}px`)
        .html(`<p># Killed: ${d.n_killed}</p>`);
    });

  // Legend
  const legend = svg
    .selectAll(".legendEntry2")
    .data([d3.color("steelblue"), d3.color("orange"), d3.color("red")])
    .enter()
    .append("g")
    .attr("class", "legendEntry2")
    .attr("transform", "translate(390,150)");

  const xLegend = 145;
  legend
    .append("rect")
    .attr("x", xLegend)
    .attr("y", function (d, i) {
      return i * 20 - 50;
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
    .attr("x", xLegend + 15) //leave 5 pixel space after the <rect>
    .attr("y", function (d, i) {
      return i * 20 - 50;
    })
    .attr("dy", "0.8em") //place text one line *below* the x,y point
    .text(function (d, i) {
      let label;
      const dString = JSON.stringify(d);
      if (dString === JSON.stringify(d3.color("steelblue"))) {
        label = "Total # of cases";
      } else if (dString === JSON.stringify(d3.color("orange"))) {
        label = "# Injured";
      } else {
        label = "# Killed";
      }
      return label;
    })
    .style("font-size", "x-small");

  // Annotation
  const annotations = [
    {
      data: { year: "2017", counts: 61401 },
      dy: -10,
      dx: -10,
      className: "show-bg",
    },
  ].map((l) => {
    l.note = Object.assign({}, l.note, {
      title: `61,401 cases occurred in 2017, ~18% more than 3 years ago`,
      bgPadding: 20,
    });
    return l;
  });

  const makeAnnotations = d3Annotation
    .annotation()
    .type(d3Annotation.annotationLabel)
    .accessors({
      x: (d) => xScale(d.year) + margin.left,
      y: (d) => yScale(d.counts) + margin.top,
    })
    .annotations(annotations);

  svg
    .append("g")
    .attr("class", "annotation-group")
    .attr("transform", `translate(${bandWidth})`)
    .call(makeAnnotations);
};
