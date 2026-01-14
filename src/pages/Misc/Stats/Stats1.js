import React, { useState } from 'react';
import './Stats.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
import DiceGrid from "./DiceGrid";
import CatanBoard from "./CatanBoard";
import DicePMF from "./DicePMF";
import ExampleBox from "../../../components/ExampleBox";


function Stats1() {
  return (
        <div className='Stats'>
        <PageNavigator group="Stats" />
        <p className='heading1'>Single Random Variable</p>
        <MathJaxContext>
        <p className='heading2'>Rolling Two Dice</p>
        <p>
        Suppose we are playing the board game <i>Settlers of Catan</i>. 
        At the start of the game, players place settlements next to resource tiles marked with numbers 2 through 12 (excluding 7). Each turn, two dice are rolled.
        If you own a settlement next to a tile whose number is rolled, you collect resources.
        If a 7 is rolled, the player who rolled the 7 gets to move the robber and block other players from collecting resources from a given tile. 
        </p>
        <p>For example, if the board looked like this and you placed a settlement in the spot marked by the blue circle, you could collect a resource each time someone rolled a 2, 6, or 10.</p>
        <div style={{display: "flex", justifyContent: "center", margin: "-80px"}}>
          <CatanBoard
            numbers={[
              5, 2, 6,
              3, 8, 10, 9,
              12, 11, 4, 8, 10,
              9, 4, 5,
              6, 3, 11
            ]}
            settlements={[
              { tile: 5, type: "circle" }
            ]}
          />
        </div>
        <p>
        Even though we don't know what dice rolls will actually happen in the game, we do know that some dice rolls are more likely than others. We can use this information to 
        build settlements next to tiles that are more likely to produce resources. Consider the 36 different possible outcomes from rolling two dice:
        </p>
        <div className='scrollable-container'><DiceGrid /></div>
        <p>
        Hover over a dice pair to see all other pairs with the same total sum. Using these outcomes, we can find the probability of each roll as the total number of ways to produce the roll divided by the total number of possibilities (36).
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th className="table-entry-head">Dice Roll (Sum)</th>
              <th className="table-entry-head">Ways to Produce Outcome</th>
              <th className="table-entry-head">Probability</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry">2</td>
              <td className="table-entry">1</td>
              <td className="table-entry">1/36</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">3</td>
              <td className="table-entry">2</td>
              <td className="table-entry">2/36</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">4</td>
              <td className="table-entry">3</td>
              <td className="table-entry">3/36</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">5</td>
              <td className="table-entry">4</td>
              <td className="table-entry">4/36</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">6</td>
              <td className="table-entry">5</td>
              <td className="table-entry">5/36</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">7</td>
              <td className="table-entry">6</td>
              <td className="table-entry">6/36</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">8</td>
              <td className="table-entry">5</td>
              <td className="table-entry">5/36</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">9</td>
              <td className="table-entry">4</td>
              <td className="table-entry">4/36</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">10</td>
              <td className="table-entry">3</td>
              <td className="table-entry">3/36</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">11</td>
              <td className="table-entry">2</td>
              <td className="table-entry">2/36</td>
            </tr>
            <tr className="table-row">
              <td className="table-entry">12</td>
              <td className="table-entry">1</td>
              <td className="table-entry">1/36</td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        The most likely roll is a 7, which happens with probability <MathJax inline>{"\\( \\frac{6}{36} = \\frac{1}{6} \\)"}</MathJax>. The next most likely rolls are 6 and 8, which happen with probability <MathJax inline>{"\\( \\frac{5}{36} \\)"}</MathJax>. The least likely rolls are 2 and 12, which happen 
        with probability <MathJax inline>{"\\( \\frac{1}{36} \\)"}</MathJax>. This means it is generally better to place settlements next to tiles with a 6 or 8. 
        </p>
        <p className='heading2'>Distribution</p>
        <p>
        The outcome of the next dice roll is uncertain. It hasn’t happened yet, but when it does, it will result in a specific number between 2 and 12. 
        In statistics, we give a name to this kind of uncertain outcome. We call it a random variable.
        </p>
        <p>
        For example, we might let <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> represent the outcome from rolling two dice. Before the dice are rolled, <MathJax inline>{"\\( \\tilde x\\)"}</MathJax>  is unknown. 
        After the dice are rolled, <MathJax inline>{"\\( \\tilde x  \\)"}</MathJax> takes on a specific value, like 6 or 9. The random variable allows us to talk about the dice roll before it happens, when uncertainty still exists.
        </p>
        <p>
        A distribution of a random variable tells us how likely each possible outcome is.
        We can visualize the distribution of <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> using a probability mass function (PMF), which is just a bar chart showing the probability of each possible sum. Each bar’s height is proportional to the chance that <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> equals that value. 
        </p>
        <div className='scrollable-container'>
          <DicePMF />
        </div>
        <p className='heading2'>Expected Value</p>
        <p>
        The expected value, or mean, of a random variable is the sum of each outcome multiplied by its probability. For example, the expected value of rolling two dice is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            E[\\tilde x] =&\\; 2\\left(\\frac{1}{36}\\right) + 3\\left(\\frac{2}{36}\\right) 
            + 4\\left(\\frac{3}{36}\\right) + 5\\left(\\frac{4}{36}\\right) 
            + 6\\left(\\frac{5}{36}\\right) + 7\\left(\\frac{6}{36}\\right) \\\\
            &+ 8\\left(\\frac{5}{36}\\right) + 9\\left(\\frac{4}{36}\\right)
            + 10\\left(\\frac{3}{36}\\right) + 11\\left(\\frac{2}{36}\\right)
            + 12\\left(\\frac{1}{36}\\right) \\\\
            =&\\; \\frac{2 + 6 + 12 + 20 + 30 + 42 + 40 + 36 + 30 + 22 + 12}{36} \\\\
            =&\\; 7 
            \\end{aligned}
          \\]`}
        </MathJax>
        </p>
        <p>
        Once we have defined a random variable, we can also find the expected value of different functions of that variable. For example, suppose we added up the two numbers on the dice and then multiplied by 3 to get our outcome. 
        The expected value in this case would be given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            E[3\\tilde x] =&\\; (3\\times 2)\\left(\\frac{1}{36}\\right) +  (3\\times 3)\\left(\\frac{2}{36}\\right) 
            + (3\\times 4)\\left(\\frac{3}{36}\\right) \\\\
             &+ (3\\times 5)\\left(\\frac{4}{36}\\right) 
            + (3\\times 6)\\left(\\frac{5}{36}\\right) + (3\\times 7)\\left(\\frac{6}{36}\\right) \\\\
            &+ (3\\times 8)\\left(\\frac{5}{36}\\right) + (3\\times 9)\\left(\\frac{4}{36}\\right)
            + (3\\times 10)\\left(\\frac{3}{36}\\right) \\\\
            &+ (3\\times 11)\\left(\\frac{2}{36}\\right)
            + (3\\times 12)\\left(\\frac{1}{36}\\right) \\\\
            =&\\; 3 \\times 7 \\\\
            =&\\; 3E[\\tilde x]
            \\end{aligned}
          \\]`}
        </MathJax>
        More generally, if we multiply a random variable by a constant or add a constant to the random variable, we can simply move in the expected value operator <MathJax inline>{"\\(\\left( E[\\cdot] \\right) \\)"}</MathJax> around the random-variable portion of the function.
        Thus, given constants <MathJax inline>{"\\( A \\)"}</MathJax> and <MathJax inline>{"\\( B \\)"}</MathJax>,
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            E[A \\tilde x + B] = A E[\\tilde x] + B
            \\end{aligned}
          \\]`}
        </MathJax>
        However, this does not work if we take a power of <MathJax inline>{"\\(\\tilde x \\)"}</MathJax>. For example, <MathJax inline>{"\\( E[\\tilde x^2] \\neq \\left( E[\\tilde x] \\right)^2 \\)"}</MathJax>.
        </p>
        <p className='heading2'>Variance</p>
        <p>
        The expected value tells us about the center of the distribution. To get a sense for how spread out the distribution is, we can calculate the variance of the distribution. 
        The variance of a random variable <MathJax inline>{"\\( \\tilde x \\)"}</MathJax> is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{var}(\\tilde x) &= E\\left[(\\tilde x - E[\\tilde x])^2\\right] \\\\
            &= E\\left[\\tilde x^2 - 2\\tilde x E[\\tilde x] + \\left(E[\\tilde x]\\right)^2\\right] \\\\
            &= E\\left[\\tilde x^2\\right] - 2E[\\tilde x] E[\\tilde x] + \\left(E[\\tilde x]\\right)^2 \\\\
            &= E\\left[\\tilde x^2\\right] - \\left(E[\\tilde x]\\right)^2
            \\end{aligned}
          \\]`}
        </MathJax>
        </p>
        <p>
        To calculate the variance using the expression after the first equal, you can subtract the mean from each original outcome, square the result, and then take the expected value using these newly calculated outcomes. 
        In the case of rolling two dice, this variance calculation method looks like
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th className="table-entry-head"><MathJax inline>{"\\( \\text{Outcome} \\)"}</MathJax></th>
              <th className="table-entry-head"><MathJax inline>{"\\( \\text{Outcome - Mean} \\)"}</MathJax></th>
              <th className="table-entry-head"><MathJax inline>{"\\( (\\text{Outcome - Mean})^2 \\)"}</MathJax></th>
              <th className="table-entry-head"><MathJax inline>{"\\( \\text{Probability} \\)"}</MathJax></th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 2 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( -5 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 25 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 1/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 3 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( -4 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 16 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 4 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( -3 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 9 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 3/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 5 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( -2 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 4 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 4/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 6 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( -1 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 1 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 5/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 7 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 6/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 8 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 1 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 1 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 5/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 9 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 4 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 4/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 10 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 3 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 9 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 3/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 11 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 4 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 16 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 12 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 5 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 25 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 1/36 \\)"}</MathJax></td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{var}(\\tilde x) =&\\; E\\left[(\\tilde x - E[\\tilde x])^2\\right] \\\\
            =&\\; 25\\left(\\frac{1}{36}\\right) + 16\\left(\\frac{2}{36}\\right) 
            + 9\\left(\\frac{3}{36}\\right) + 4\\left(\\frac{4}{36}\\right) 
            + 1\\left(\\frac{5}{36}\\right) + 0\\left(\\frac{6}{36}\\right) \\\\
            &+ 1\\left(\\frac{5}{36}\\right) + 4\\left(\\frac{4}{36}\\right)
            + 9\\left(\\frac{3}{36}\\right) + 16\\left(\\frac{2}{36}\\right)
            + 25\\left(\\frac{1}{36}\\right) \\\\
            =&\\; \\frac{25 + 32 + 27 + 16 + 5 + 5 + 16 + 27 + 32 + 25}{36} \\\\
            \\approx&\\; 5.83
            \\end{aligned}
          \\]`}
        </MathJax>
        To calculate the variance using the expression after the last equal sign, you first square each outcome and calculate the expected value using these squared outcomes. Then, you subtract the squared mean from this result. 
        In the case of rolling two dice, this variance calculation method looks like
        </p>
        <div className="table-wrapper">
        <table className="my-table">
          <thead>
            <tr>
              <th className="table-entry-head"><MathJax inline>{"\\( \\text{Outcome} \\)"}</MathJax></th>
              <th className="table-entry-head"><MathJax inline>{"\\( \\text{Outcome}^2 \\)"}</MathJax></th>
              <th className="table-entry-head"><MathJax inline>{"\\( \\text{Probability} \\)"}</MathJax></th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 2 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 4 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 1/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 3 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 9 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 4 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 16 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 3/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 5 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 25 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 4/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 6 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 36 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 5/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 7 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 49 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 6/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 8 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 64 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 5/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 9 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 81 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 4/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 10 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 100 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 3/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 11 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 121 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 2/36 \\)"}</MathJax></td>
            </tr>
            <tr className="table-row">
              <td className="table-entry"><MathJax inline>{"\\( 12 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 144 \\)"}</MathJax></td>
              <td className="table-entry"><MathJax inline>{"\\( 1/36 \\)"}</MathJax></td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            E\\left[\\tilde x^2\\right] =&\\; 4\\left(\\frac{1}{36}\\right) + 9\\left(\\frac{2}{36}\\right) 
            + 16\\left(\\frac{3}{36}\\right) + 25\\left(\\frac{4}{36}\\right) 
            + 36\\left(\\frac{5}{36}\\right) + 49\\left(\\frac{6}{36}\\right) \\\\
            &+ 64\\left(\\frac{5}{36}\\right) + 81\\left(\\frac{4}{36}\\right)
            + 100\\left(\\frac{3}{36}\\right) + 121\\left(\\frac{2}{36}\\right)
            + 144\\left(\\frac{1}{36}\\right) \\\\
            =&\\; \\frac{4 + 18 + 48 + 100 + 180 + 294 + 320 + 324 + 300 + 242 + 144}{36} \\\\
            \\approx&\\; 54.83 \\\\ \\\\
            \\text{var}(\\tilde x) =&\\; E\\left[\\tilde x^2\\right] - \\left(E[\\tilde x]\\right)^2 \\\\
            \\approx&\\; 54.83 - 7^2 \\\\
            =&\\; 5.83
            \\end{aligned}
          \\]`}
        </MathJax>
        The standard deviation of a random variable is simply the square root of the variance. In the case of rolling two dice, we have <MathJax inline>{"\\( \\text{std}(\\tilde x) = \\sqrt{\\text{var}(\\tilde x)} \\approx 2.42 \\)"}</MathJax>.
        </p>
        <p className='heading2'>Placing a Settlement</p>
        <p>
        With the concepts of mean and variance in place, let's consider the decision of where to place a settlement in the game. 
        Suppose we are deciding between the following two spots, and we care only about the total number of resources (not specific resource types):
        </p>
        <div style={{display: "flex", justifyContent: "center", margin: "-80px"}}>
          <CatanBoard
            numbers={[
              5, 2, 6,
              3, 8, 10, 9,
              12, 11, 4, 4, 10,
              9, 3, 6,
              5, 8, 11
            ]}
            settlements={[
              { tile: 14, type: "circle" },
              { tile: 9, type: "circle" },
            ]}
          />
        </div>
        <p>
        To compare these spots, let's calculate the expected number of resources each spot will yield per turn. The first spot (8, 10, and 4) is expected to 
        produce <MathJax inline>{"\\( \\frac{5}{36} + \\frac{3}{36} + \\frac{3}{36} =  \\frac{11}{36}\\)"}</MathJax> resources per turn. The second spot (4, 4, and 6) is expected to 
        produce <MathJax inline>{"\\( 2\\left(\\frac{3}{36}\\right) + \\frac{5}{36} =  \\frac{11}{36}\\)"}</MathJax> resources per turn as well.
        </p>
        <p>
        What about the variance of these resource yields? The first spot has variance 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\left(1 - \\frac{11}{36}\\right)^2\\left(\\frac{5}{36}\\right) + \\left(1 - \\frac{11}{36}\\right)^2\\left(\\frac{3}{36}\\right)+ \\left(1 - \\frac{11}{36}\\right)^2\\left(\\frac{3}{36}\\right)  + \\left(0 - \\frac{11}{36}\\right)^2\\left(\\frac{36 - (5 + 3 + 3)}{36}\\right) \\approx 0.212
            \\end{aligned}
          \\]`}
        </MathJax>
        The second spot has variance 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\left(2 - \\frac{11}{36}\\right)^2\\left(\\frac{3}{36}\\right) + \\left(1 - \\frac{11}{36}\\right)^2\\left(\\frac{5}{36}\\right)  + \\left(0 - \\frac{11}{36}\\right)^2\\left(\\frac{36 - (3+5)}{36}\\right) \\approx 0.379
            \\end{aligned}
          \\]`}
        </MathJax>
        </p>
        <p>
        This tells us that both spots have the same expected production, but the first spot produces more consistently than the second. In other words, choosing the first spot is more likely to give you <i>something</i> on a given turn while choosing the second spot will produce occasional 2-resource spikes with more turns on which you receive nothing.
        </p>
        <p className='heading2'>Examples</p>
          <ExampleBox solution={
            <>
              <p>
              There are 52 cards in a deck with 4 jacks, 4 queens, 4 kings, and 4 aces. Thus, the probability of each outcome is given by 
              </p>
              <div className="table-wrapper">
              <table className="my-table">
                <thead>
                  <tr>
                    <th className="table-entry-head">Outcome</th>
                    <th className="table-entry-head">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-row">
                    <td className="table-entry"><MathJax inline>{"\\( 1 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( \\frac{4}{52} = \\frac{1}{13} \\)"}</MathJax></td>
                  </tr>
                  <tr className="table-row">
                    <td className="table-entry"><MathJax inline>{"\\( 2 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( \\frac{4}{52} = \\frac{1}{13} \\)"}</MathJax></td>
                  </tr>
                  <tr className="table-row">
                    <td className="table-entry"><MathJax inline>{"\\( 3 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( \\frac{4}{52} = \\frac{1}{13} \\)"}</MathJax></td>
                  </tr>
                  <tr className="table-row">
                    <td className="table-entry"><MathJax inline>{"\\( 6 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( \\frac{4}{52} = \\frac{1}{13} \\)"}</MathJax></td>
                  </tr>
                  <tr className="table-row">
                    <td className="table-entry"><MathJax inline>{"\\( 0 \\)"}</MathJax></td>
                    <td className="table-entry"><MathJax inline>{"\\( \\frac{52 - (4 + 4 + 4 + 4)}{52} = \\frac{9}{13} \\)"}</MathJax></td>
                  </tr>
                </tbody>
              </table>
              </div>
              <p>
              The expected value is 
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  1\\left(\\frac{1}{13}\\right) + 2\\left(\\frac{1}{13}\\right) + 3\\left(\\frac{1}{13}\\right) + 6\\left(\\frac{1}{13}\\right) = \\frac{12}{13}
                  \\end{aligned}
                \\]`}
              </MathJax>
              The variance is 
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  &\\left(1 - \\frac{12}{13}\\right)^2\\left(\\frac{1}{13}\\right) + \\left(2 - \\frac{12}{13}\\right)^2\\left(\\frac{1}{13}\\right) 
                  + \\left(3 - \\frac{12}{13}\\right)^2\\left(\\frac{1}{13}\\right) \\\\
                  &+ \\left(6 - \\frac{12}{13}\\right)^2\\left(\\frac{1}{13}\\right) + \\left(0 - \\frac{12}{13}\\right)^2\\left(\\frac{9}{13}\\right) \\approx 2.99
                  \\end{aligned}
                \\]`}
              </MathJax>
              Risk neutral or risk averse people would not enjoy this game because the expected winnings are less than the cost of playing the game.
              </p>
            </>
          }>
            <p><strong>Example 1:</strong> A carnival game lets players randomly choose a card from a deck. If a jack is chosen, the player wins $1; if a queen is chosen, the player wins $2; if a king is chosen, the player wins $3; if an ace is chosen, the player wins $6; otherwise, the player does not win anything. What are the expected winnings from playing the game? What is the variance? Would you play this game if it cost $1?</p>
          </ExampleBox>
          <ExampleBox solution={
            <>
              <p>
              We can compare these gambles using their expected values and variances. The first gamble pays $1 with probability 1/2 and $0 with probability 1/2, which yields an expected value of $0.50. 
              The second gamble pays $3 with probability 1/6 and $0 with probability 5/6, which also yields an expected value of $0.50. 
              </p>
              <p>
              The variance of the first gamble is 
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  \\left(1 - \\frac{1}{2}\\right)^2\\left(\\frac{1}{2}\\right) + \\left(0 - \\frac{1}{2}\\right)^2\\left(\\frac{1}{2}\\right) = \\frac{1}{4}
                  \\end{aligned}
                \\]`}
              </MathJax>
              The variance of the second gamble is
              <MathJax className='math-container'>
                {`\\[
                  \\begin{aligned}
                  \\left(3 - \\frac{1}{2}\\right)^2\\left(\\frac{1}{6}\\right) + \\left(0 - \\frac{1}{2}\\right)^2\\left(\\frac{5}{6}\\right) = \\frac{5}{4}
                  \\end{aligned}
                \\]`}
              </MathJax>
              Risk averse people would prefer the first gamble since it has lower variance.
              </p>
            </>
          }>
            <p><strong>Example 2:</strong> Would you rather win $1 if a coin flips heads or $3 if a dice rolls a 6?</p>
          </ExampleBox>
        </MathJaxContext>
        <PageNavigator group="Stats"/>
        </div>
  );
}

export default Stats1;