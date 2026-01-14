import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const initialData = [
  { id: 1, stakes: 20, hours: 10 },
  { id: 2, stakes: 40, hours: 30 },
  { id: 3, stakes: 60, hours: 20 },
  { id: 4, stakes: 80, hours: 30 },
  { id: 5, stakes: 100, hours: 50 },
  { id: 6, stakes: 120, hours: 60 },
  { id: 7, stakes: 140, hours: 80 },
  { id: 8, stakes: 160, hours: 70 },
  { id: 9, stakes: 180, hours: 100 },
  { id: 10, stakes: 200, hours: 90 },
  { id: 11, stakes: 220, hours: 100 },
  { id: 12, stakes: 240, hours: 120 }
];

export default function RegressionScatterPlot({
  width = 600,
  height = 400,
  showRegression = false,
  enableDrag = false,
  showResiduals = false
}) {
  const svgRef = useRef();
  const [data, setData] = useState(() => {
                          return initialData.map(d => ({ ...d }));
                        });
  const xMax = 260;
  const yMax = 130;

  const computeRegression = (dataPoints) => {
    const n = dataPoints.length;
    const meanX = d3.mean(dataPoints, d => d.stakes);
    const meanY = d3.mean(dataPoints, d => d.hours);

    let num = 0, den = 0;
    dataPoints.forEach(d => {
      num += (d.stakes - meanX) * (d.hours - meanY);
      den += (d.stakes - meanX) ** 2;
    });
    const slope = num / den;
    const intercept = meanY - slope * meanX;
    return { slope, intercept };
  };

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Scales
    const xScale = d3.scaleLinear()
      .domain([0, xMax])  // fixed
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, yMax])  // fixed
      .range([innerHeight, 0]);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));
    g.append('g')
      .call(d3.axisLeft(yScale));

    // Axis labels
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 35)
      .attr('text-anchor', 'middle')
      .text('Case Stakes (in thousands of dollars)');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -35)
      .attr('text-anchor', 'middle')
      .text('Hours Billed');

    // Regression
    let regression;
    let line;
    if (showRegression) {
      regression = computeRegression(data);

      line = g.append('line')
        .attr('x1', xScale(0))
        .attr('y1', yScale(regression.intercept))
        .attr('x2', xScale(xMax))
        .attr('y2', yScale(regression.intercept + regression.slope * xMax))
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2);

      // Smooth line updates
      if (enableDrag) {
        // Animate transition
        line.transition().duration(100).ease(d3.easeLinear);
      }
    }

    // Residuals
    const drawResiduals = () => {
      if (!showResiduals || !showRegression) return;

      const residualLines = g.selectAll('.residual')
        .data(data, d => d.id)
        .join('line')
        .attr('class', 'residual')
        .attr('stroke', 'gray')
        .attr('stroke-dasharray', '4 2');

      residualLines
        .transition().duration(50)
        .attr('x1', d => xScale(d.stakes))
        .attr('x2', d => xScale(d.stakes))
        .attr('y1', d => yScale(d.hours))
        .attr('y2', d => yScale(regression.intercept + regression.slope * d.stakes));
    };

    drawResiduals();

    // Dragging
    const drag = d3.drag()
      .on('start', function(event, d) {
        d3.select(this).raise().attr('stroke', 'black');
        d3.select(this).raise().attr('stroke', 'black');
        d.isDragging = true;
      })
      .on('drag', function(event, d) {
        if (!enableDrag) return;

        // Pointer relative to inner chart group
        const [mouseX, mouseY] = d3.pointer(event, g.node());

        // Clamp to inner chart
        const clampedX = Math.max(0, Math.min(innerWidth, mouseX));
        const clampedY = Math.max(0, Math.min(innerHeight, mouseY));

        // Update the circle directly in D3 (no React state yet)
        d3.select(this)
          .attr('cx', clampedX)
          .attr('cy', clampedY);

        // Update the data object for regression calculations
        d.stakes = xScale.invert(clampedX);
        d.hours = yScale.invert(clampedY);

        // Update regression line & residuals immediately
        if (showRegression) {
          const { slope, intercept } = computeRegression(data);

          line
            .attr('y1', yScale(intercept))
            .attr('y2', yScale(intercept + slope * xMax));

          if (showResiduals) {
            g.selectAll('.residual')
              .attr('visibility', d => d.isDragging ? 'hidden' : 'visible') // <-- hide if dragging
              .attr('x1', d => xScale(d.stakes))
              .attr('x2', d => xScale(d.stakes))
              .attr('y1', d => yScale(d.hours))
              .attr('y2', d => yScale(intercept + slope * d.stakes));
          }
        }
      })
      .on('end', function(event, d) {
        d3.select(this).attr('stroke', null);
        d.isDragging = false; 
        g.selectAll('.residual')
          .filter(r => r.id === d.id)         // only the line of the dragged point
          .attr('visibility', 'visible');
      });

    g.selectAll('.point')
      .data(data, d => d.id)
      .join('circle')
      .attr('class', 'point')
      .attr('r', 6)
      .attr('fill', 'orange')
      .attr('cx', d => xScale(d.stakes))
      .attr('cy', d => yScale(d.hours))
      .call(enableDrag ? drag : () => {});

    // Update regression and residuals when data changes
    if (showRegression && enableDrag) {
      const updateLine = () => {
        const { slope, intercept } = computeRegression(data);
        line
          .transition().duration(50)
          .attr('y1', yScale(intercept))
          .attr('y2', yScale(intercept + slope * xMax));
      };
      updateLine();
      drawResiduals();
    }

  }, [data, showRegression, enableDrag, showResiduals, width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
}
