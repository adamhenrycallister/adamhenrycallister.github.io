import React, { useState } from 'react';
import './Stats.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
import RegressionScatterPlot from "./RegressionScatterPlot";
// import ExampleBox from "../../../components/ExampleBox";


function Stats4() {
  return (
        <div className='Stats'>
        <PageNavigator group="Stats" />
        <p className='heading1'>Regression</p>
        <MathJaxContext>
        <p className='heading2'>Relationship Between Two Variables</p>
        <p>
        In the lesson on <NavLink className='inline-link' to="/stats/multiple_random_variable">Multiple Random Variables</NavLink>, we talked about 
        ways of comparing two variables. For example, suppose we are interested in the relationship between the dollar amount at stake in civil litigation and the number of hours law firms bill their clients. 
        Let's say we observe the following data points:
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th className="table-entry-head">Case</th>
              <th className="table-entry-head">Stakes (in thousands of dollars)</th>
              <th className="table-entry-head">Hours Billed</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry">1</td>
              <td className="table-entry">20</td>
              <td className="table-entry">10</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">2</td>
              <td className="table-entry">40</td>
              <td className="table-entry">30</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">3</td>
              <td className="table-entry">60</td>
              <td className="table-entry">20</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">4</td>
              <td className="table-entry">80</td>
              <td className="table-entry">30</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">5</td>
              <td className="table-entry">100</td>
              <td className="table-entry">50</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">6</td>
              <td className="table-entry">120</td>
              <td className="table-entry">60</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">7</td>
              <td className="table-entry">140</td>
              <td className="table-entry">80</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">8</td>
              <td className="table-entry">160</td>
              <td className="table-entry">70</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">9</td>
              <td className="table-entry">180</td>
              <td className="table-entry">100</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">10</td>
              <td className="table-entry">200</td>
              <td className="table-entry">90</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">11</td>
              <td className="table-entry">220</td>
              <td className="table-entry">100</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">12</td>
              <td className="table-entry">240</td>
              <td className="table-entry">120</td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        Let's denote stakes as the variable <MathJax inline>{"\\( x \\)"}</MathJax> and hours billed as the variable <MathJax inline>{"\\( y \\)"}</MathJax>. Thus, the stakes and hours billed on the first case are given by the ordered pair <MathJax inline>{"\\( (x_1, y_1) = (20, 18) \\)"}</MathJax>.
        </p>
        <p>
        Intuitively we might expect that higher stakes case result in more hours billed. How might we formalize or test this intuition? 
        We could calculate the covariance and the correlation between the two variables. These measures would tell us whether there is a positive relationship between stakes and hours billed (i.e., hours billed goes up when stakes goes up). 
        But what if we want to say something more about the relationship, like "for every additional $1,000 at stake in the case, law firms bill [--] more hours on average"? To do this, we rely on linear regression. 
        </p>
        <p className='heading2'>Fitting a Line</p>
        <p>
        First, let's plot our data with case stakes on the x-axis and hours billed on the y-axis. 
        </p>
        <div className='scrollable-container'>
          <div style={{position: 'relative'}}>
            <RegressionScatterPlot
              showRegression={false}
              enableDrag={false}
              showResiduals={false}
            />
          </div>
        </div>
        <p>
        Our goal here is to draw a line through the points in a way that best represents the relationship between the two variables. 
        In this case, we can see a clear positive relationship, which means the slope of our line should be positive. But how should we choose the magnitude of the slope and the y-intercept of the line?
        </p>
        <p>
        We could draw lots of different lines through these points depending on our choice of slope and y-intercept. We need some sort of criteria to help us pick the best line. 
        Let's consider some candidate line with slope <MathJax inline>{"\\( \\beta \\)"}</MathJax> and y-intercept <MathJax inline>{"\\( \\alpha \\)"}</MathJax>.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            y = \\alpha + \\beta x 
            \\end{aligned}
          \\]`}
        </MathJax> 
        For any given datapoint, our line is going to be slightly off since connecting the points does not create a perfectly straight line.
        To determine whether we have found the best line, let's consider by how much we are "off" from each point. To do this, we can calculate for each point the difference between 
        (1) the actual y-value from the data and (2) the y-value implied by our line. For example, in case 1, the hours billed implied by our line is <MathJax inline>{"\\( \\alpha + x_1\\beta  = \\alpha + 20\\beta  \\)"}</MathJax> and the 
        actual hours billed is <MathJax inline>{"\\( y_1 = 10 \\)"}</MathJax>. Thus, the "error" from using the line to predict billed hours from case stakes is <MathJax inline>{"\\( y_1 - (\\alpha + x_1\\beta) = 10 - (\\alpha + 20\\beta) \\)"}</MathJax>.
        </p>
        <p>
        We can sum up the error from each point to construct a measure of how well our line fits the data. The problem with this approach 
        is that our line may be too high relative to the actual value in some cases (resulting in negative error) and too low relative to the actual value in other cases (resulting in positive error). 
        To account for this, we will take the square of each error before summing up all the error terms.
        Thus, the line that best describes the relationship between the variables is the one that produces the lowest total squared error.
        </p>
        <p>
        The graph below illustrates how this works in practice. The dotted line connecting each point to the blue line represents the error for that point, or the amount by which the y-value predicted by the line is off from the actual y-value. 
        The blue line represents the choice of slope and y-intercept that results in the lowest total squared error. 
        </p>
        <div className='scrollable-container'>
          <div style={{position: 'relative'}}>
            <RegressionScatterPlot
              showRegression={true}
              enableDrag={true}
              showResiduals={true}
            />
          </div>
        </div>
        <p>
        Click and drag the orange points to change the data values. Notice how the slope and y-intercept of the line change as you move the points around.
        </p>
        <p className='heading2'>Minimizing Squared Error</p>
        <p>
        Now that we've seen how this works visually, let's find an equation for the best line. For any given data point <MathJax inline>{"\\( i \\)"}</MathJax>, we'll define the predicted value as the y-value implied by our line, or 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\hat y_i = \\alpha + \\beta x_i
            \\end{aligned}
          \\]`}
        </MathJax> 
        Thus, the error for a each point is given by <MathJax inline>{"\\( \\hat \\varepsilon_i = y_i - \\hat y_i  \\)"}</MathJax>. We want to choose the slope and y-intercept of the line to minimize the sum of the squared error across all points. 
        If we have <MathJax inline>{"\\( N \\)"}</MathJax> observations, we can write the problem as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              \\underset{\\alpha, \\beta}{\\text{min}} \\sum^N_{i=1} \\hat \\varepsilon_i^2 
              &= \\underset{\\alpha, \\beta}{\\text{min}} \\sum^N_{i=1}  (y_i - \\hat y_i)^2 \\\\
              &= \\underset{\\alpha, \\beta}{\\text{min}} \\sum^N_{i=1}  (y_i - (\\alpha + \\beta x_i))^2 
            \\end{aligned}
          \\]`}
        </MathJax> 
        To find the optimal values for <MathJax inline>{"\\( \\alpha \\)"}</MathJax> and <MathJax inline>{"\\( \\beta \\)"}</MathJax> (<MathJax inline>{"\\( \\hat \\alpha \\)"}</MathJax> and <MathJax inline>{"\\( \\hat \\beta \\)"}</MathJax>), we'll take a derivative with respect to each of these parameters and set these derivatives equal to zero. This gives us 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              -2\\sum^N_{i=1} (y_i - (\\hat \\alpha + \\hat \\beta x_i)) = 0 \\qquad\\qquad &(1) \\\\ 
              -2\\sum^N_{i=1} x_i(y_i - (\\hat \\alpha + \\hat \\beta x_i)) = 0 \\qquad\\qquad &(2)
            \\end{aligned}
          \\]`}
        </MathJax> 
        We'll use equation (1) to solve for <MathJax inline>{"\\( \\hat \\alpha \\)"}</MathJax> in terms of <MathJax inline>{"\\( \\hat \\beta \\)"}</MathJax> .
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              &-2\\sum^N_{i=1} (y_i - (\\hat \\alpha + \\hat \\beta x_i)) = 0 \\\\ 
              &\\Leftrightarrow \\frac{1}{N} \\sum^N_{i=1} (\\hat \\alpha + \\hat \\beta x_i) = \\frac{1}{N} \\sum^N_{i=1} y_i \\\\
              &\\Leftrightarrow \\hat \\alpha  = \\frac{1}{N} \\sum^N_{i=1} y_i - \\hat \\beta\\left(\\frac{1}{N} \\sum^N_{i=1} x_i\\right)\\\\
            \\end{aligned}
          \\]`}
        </MathJax> 
        Note that <MathJax inline>{"\\( \\frac{1}{N} \\sum^N_{i=1} x_i \\)"}</MathJax> and <MathJax inline>{"\\( \\frac{1}{N} \\sum^N_{i=1} y_i \\)"}</MathJax> are just the mean of <MathJax inline>{"\\( x \\)"}</MathJax> and <MathJax inline>{"\\( y \\)"}</MathJax>. 
        Thus, we can write
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              \\hat \\alpha  = \\bar y - \\hat \\beta\\bar x\\\\
            \\end{aligned}
          \\]`}
        </MathJax> 
        Now, we plug in this expression for <MathJax inline>{"\\( \\hat \\alpha \\)"}</MathJax> into equation (2) and solve for <MathJax inline>{"\\( \\hat \\beta\\)"}</MathJax>.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              &-2\\sum^N_{i=1} x_i(y_i - (\\hat \\alpha + \\hat \\beta x_i)) = 0 \\\\
              &\\Leftrightarrow \\frac{1}{N}\\sum^N_{i=1} x_i(y_i -(\\bar y - \\hat \\beta\\bar x + \\hat \\beta x_i)) = 0 \\\\
              &\\Leftrightarrow \\hat \\beta \\left[\\frac{1}{N}\\sum^N_{i=1} x_i^2 - \\bar x\\left(\\frac{1}{N}\\sum^N_{i=1} x_i\\right)\\right] = \\frac{1}{N}\\sum^N_{i=1} x_i y_i - \\left(\\frac{1}{N}\\sum^N_{i=1} x_i\\right)\\bar y \\\\
              &\\Leftrightarrow \\hat \\beta  = \\frac{\\frac{1}{N}\\sum^N_{i=1} x_i y_i - \\bar x\\bar y}{\\frac{1}{N}\\sum^N_{i=1} x_i^2 - \\bar x^2 }
            \\end{aligned}
          \\]`}
        </MathJax> 
        Note that we can rewrite the bottom of this fraction as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              \\frac{1}{N}\\sum^N_{i=1} x_i^2 - \\bar x^2 &= \\frac{1}{N}\\sum^N_{i=1} \\left(x_i^2 - 2x_i \\bar x + \\bar x^2 \\right) \\\\
              &= \\frac{1}{N}\\sum^N_{i=1}(x_i - \\bar x)^2 
            \\end{aligned}
          \\]`}
        </MathJax> 
        Similarly, we can rewrite the top of this fraction as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              \\frac{1}{N}\\sum^N_{i=1} x_i y_i - \\bar x\\bar y &= \\frac{1}{N}\\sum^N_{i=1} (x_iy_i - x_i\\bar y - \\bar x y_i + \\bar x \\bar y) \\\\
              &= \\frac{1}{N}\\sum^N_{i=1} (x_i - \\bar x)(y_i - \\bar y) 
            \\end{aligned}
          \\]`}
        </MathJax> 
        Thus, we have that 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              \\hat \\beta &= \\frac{\\frac{1}{N}\\sum^N_{i=1} (x_i - \\bar x)(y_i - \\bar y) }{\\frac{1}{N}\\sum^N_{i=1}(x_i - \\bar x)^2 } \\\\
              &= \\frac{\\frac{1}{N - 1}\\sum^N_{i=1} (x_i - \\bar x)(y_i - \\bar y) }{\\frac{1}{N - 1}\\sum^N_{i=1}(x_i - \\bar x)^2 } \\\\
              &= \\frac{s_{x,y}}{s_x^2}
            \\end{aligned}
          \\]`}
        </MathJax> 
        This means the slope of the best fit line is simply the sample covariance of <MathJax inline>{"\\( x \\)"}</MathJax> and <MathJax inline>{"\\( y \\)"}</MathJax> over the sample variance of <MathJax inline>{"\\( x \\)"}</MathJax>.
        </p>
        <p>
        Putting everything together, we can estimate the relationship between two variables using a linear regression where 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              \\hat y_i &= \\hat \\alpha + \\hat \\beta x_i \\\\
              &= \\bar y + \\frac{s_{x,y}}{s^2_x}(x_i - \\bar x)
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Interpreting Slope</p>
        <p>
        The slope of a regression line can be used to formalize the magnitude of the relationship between two variables. 
        To see this in practice, let's calculate the slope of the regression line for hours billed on case stakes. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
              \\bar x &= \\frac{1}{N}\\sum^N_{i=1}x_i = 130 \\\\
              \\bar y &= \\frac{1}{N}\\sum^N_{i=1}y_i \\approx 63.33 \\\\
              s_{x,y} &= \\frac{1}{N - 1}\\sum^N_{i=1} (x_i - \\bar x)(y_i - \\bar x) \\approx 2509.09 \\\\
              s_x^2 &= \\frac{1}{N - 1}\\sum^N_{i=1} (x_i - \\bar x)^2 = 5200 \\\\
              \\hat \\beta &= \\frac{s_{x,y}}{s^2_x} \\approx 0.4825
            \\end{aligned}
          \\]`}
        </MathJax> 
        A slope coefficient of about 1/2 means that increasing the stakes of a case by $1,000 is predicted to add an additional half hour to the total hours billed on the case.
        </p>
        <p>
        It is important to be clear about what this interpretation means. The slope of a regression line describes an association, not necessarily a causal effect.
        In particular, the coefficient does not mean that mechanically increasing the stakes of a case by $1,000 would cause lawyers to spend an additional half hour on the case. 
        Case stakes are not randomly assigned. More complex cases tend to have both higher stakes and require more lawyer time, and lawyers may choose to invest more effort in cases they believe are more important for reasons not captured in the data.
        The regression slope summarizes how hours billed and case stakes tend to move together in the observed data. 
        Whether this relationship reflects a causal effect, strategic behavior, case complexity, or some combination of these factors is a separate question that requires additional assumptions or evidence.
        </p>  
        </MathJaxContext>
      <PageNavigator group="Stats"/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/stats">Contents</NavLink></div>
        </div>
  );
}
export default Stats4;