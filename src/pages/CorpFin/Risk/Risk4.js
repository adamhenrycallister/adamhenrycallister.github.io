import React, { useState } from 'react';
import './Risk.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
// import ExampleBox from "../../../components/ExampleBox";
import TwoStockCombinations from "./TwoStockCombinations";
import ThreeStockCombinations from "./ThreeStockCombinations";
import CapLine from "./CapLine";

function Risk4() {
  return (
        <div className='Risk'>
        <PageNavigator group="Risk" />
        <p className='heading1'>Efficient Frontier</p>
        <MathJaxContext>
        <p className='heading2'>Portfolio Returns</p>
        <p>
        Instead of considering dollar outcomes from an investment, let's switch to thinking about returns. Returns normalize outcomes, making risk and diversification comparable across investments and portfolio sizes. 
        The return on a stock (assuming no dividends) is the difference between the price at which you sell the stock and the price at which you buy the stock divided by the price at which you buy the stock.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            R = \\frac{P_S - P_B}{P_B}
            \\end{aligned}
          \\]`}
        </MathJax> 
        When deciding whether to buy a stock today, the purchase price is known with certainty, but the price at which the stock can be sold in the future is uncertain. That uncertainty means the stock can generate different 
        returns in different states of the world. If we knew the possible future sale prices and the probability of each state of the world, we could calculate the stock's expected (mean) return as well as the variability, or variance, of its return.
        Based on our taste for risk, we could then decide whether to invest by weighing the expected return against the risk reflected in the return variance.
        </p>
        <p>
        If we have the option of investing in multiple securities, we also care about the correlation between different stock returns. As discussed on the previous page, diversification may allow us to achieve the same return with lower variance. We can create a 
        portfolio by investing in many different assets. 
        </p>
        <p>
        Suppose we have the option to invest in company Y and company Z, which have returns <MathJax inline>{"\\( R_y \\)"}</MathJax> and <MathJax inline>{"\\( R_z \\)"}</MathJax> respectively. The mean return of each company's stock is <MathJax inline>{"\\( E[R_y] = \\bar R_y \\)"}</MathJax> and <MathJax inline>{"\\( E[R_z] = \\bar R_z \\)"}</MathJax>. 
        Company Y's stock has a return variance of <MathJax inline>{"\\( \\text{var}(R_y) = \\sigma^2_y \\)"}</MathJax>, and company Z's stock has a return variance of <MathJax inline>{"\\( \\text{var}(R_z)= \\sigma^2_z \\)"}</MathJax>. 
        The two stocks have a correlation coefficient of <MathJax inline>{"\\( \\rho_{y,z} \\)"}</MathJax>. I can form a portfolio by investing a <MathJax inline>{"\\( w_y \\)"}</MathJax> proportion of my wealth in company Y and a <MathJax inline>{"\\( w_z = 1 - w_y \\)"}</MathJax> proportion of my wealth in company Z. 
        What is the mean return and return variance of my portfolio?
        </p>
        <p>
        To find the mean portfolio return, I simply apply the weights (<MathJax inline>{"\\( w_y \\)"}</MathJax> and <MathJax inline>{"\\( w_z \\)"}</MathJax>) to the mean return of each individual stock.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\bar R_{portfolio} &= E[w_yR_y + w_zR_z] \\\\
            &= w_yE[R_y] + w_zE[R_z] \\\\
            &= w_y\\bar R_y + w_z \\bar R_z
            \\end{aligned}
          \\]`}
        </MathJax>  
        The portfolio variance is given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{var} (R_{portfolio}) &= E[(w_yR_y +w_zR_z)^2] -(E[w_yR_y +w_zR_z]])^2 \\\\
            &= w_y^2E[R_y^2] + 2w_yw_zE[R_yR_z] + w_z^2E[R_z^2] - w_y^2(E[R_y])^2 - 2w_yw_zE[R_y]E[R_z] - w_z^2(E[R_z])^2 \\\\
            &= w_y^2\\left(E[R_y^2] - (E[R_y])^2\\right) + w_z^2\\left(E[R_z^2] - (E[R_z])^2\\right) + 2w_yw_z\\left(E[R_yR_z] - E[R_y]E[R_z]\\right) \\\\
            &= w_y^2 \\text{var}(R_y) + w_z^2 \\text{var}(R_z) + 2w_yw_z \\text{cov}(R_y,R_z) \\\\
            &= w_y^2 \\sigma^2_y + w_z^2 \\sigma^2_z + 2w_yw_z\\rho_{y,z}\\sigma_y\\sigma_z
            \\end{aligned}
          \\]`}
        </MathJax>  
        where <MathJax inline>{"\\( \\sigma_y \\)"}</MathJax> and <MathJax inline>{"\\( \\sigma_y \\)"}</MathJax> are the standard deviations of company Y's and company Z's stock returns respectively <MathJax inline>{"\\( \\left(\\rho_{y,z} = \\frac{\\text{cov}(R_y, R_z)}{\\sqrt{\\text{var}(R_y)\\text{var}(R_z)}} = \\frac{\\text{cov}(R_y, R_z)}{\\sigma_y \\sigma_z}\\right) \\)"}</MathJax>.
        </p>
        <p className='heading2'>Diversification</p>
        <p>
        Recall the discussion on the last page about how diversification can reduce variance as long as the correlation coefficient is less than 1. Let's look at what that means in terms of our equation for portfolio variance. 
        First, we'll assume that both companies have the same variance (<MathJax inline>{"\\( \\sigma^2 = \\sigma_y^2 = \\sigma_z^2 \\)"}</MathJax> and <MathJax inline>{"\\( \\sigma = \\sigma_y = \\sigma_z \\)"}</MathJax>).
        Then, our portfolio variance becomes
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\text{var} (R_{portfolio}) &= \\sigma^2(w_y^2+ w_z^2  + 2w_yw_z\\rho_{y,z}) 
            \\end{aligned}
          \\]`}
        </MathJax>  
        If <MathJax inline>{"\\( \\rho_{y,z} =1 \\)"}</MathJax>, then <MathJax inline>{"\\( \\text{var} (R_{portfolio}) =  \\sigma^2(w_y^2+ w_z^2  + 2w_yw_z) = \\sigma^2(w_y + w_z)^2 = \\sigma^2\\)"}</MathJax>, which is the same return variance that we would get from investing in one individual stock. 
        Thus, diversification does nothing to decrease variance when correlation is 1. Another way to see this is to note that a correlation coefficient less than 1 will result in a reduction in variance since the expression multiplied by <MathJax inline>{"\\( \\sigma^2 \\)"}</MathJax> is less than 1 if <MathJax inline>{"\\( \\rho_{y,z} \\)"}</MathJax> is less than 1.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            &w_y^2+ w_z^2  + 2w_yw_z\\rho_{y,z} < 1 \\\\
            &\\Leftrightarrow \\rho_{y,z} < \\frac{1 - w_y^2 - w_z^2}{2w_yw_z} = \\frac{1 - (w_y^2 + 2w_yw_z +w_z^2) + 2w_yw_z}{2w_yw_z} = \\frac{1 - (w_y+w_z)^2}{2w_yw_z} + 1 = 1
            \\end{aligned}
          \\]`}
        </MathJax>  
        </p>
        <p className='heading2'>Mean and Variance Combinations</p>
        <p>
        What are all the possible mean return and return variance combinations that we can achieve with 2 stocks? Using our equations for the mean portfolio return and portfolio variance, we can vary the weights to map out all the possibilites. 
        Let's suppose the mean return of company Y's stock is higher than the mean return of company Z's stock (<MathJax inline>{"\\( \\bar R_y > \\bar R_z \\)"}</MathJax>). Since the mean portfolio return is a linear combination of the individual stock returns, we can achieve any 
        return between <MathJax inline>{"\\( \\bar R_z \\)"}</MathJax> and <MathJax inline>{"\\( \\bar R_y \\)"}</MathJax> simply by choosing the right weights (<MathJax inline>{"\\( w_y \\)"}</MathJax> and <MathJax inline>{"\\( w_z \\)"}</MathJax>). The range of possible portfolio variances 
        depends on the correlation between the two stock returns in addition to the weights. The graph below plots the possible mean returns and standard deviations of a portfolio with two stocks based on the mean return, standard deviation, and correlation of each stock. 
        </p>
        <div style={{
              display: 'flex',
              width: '100%',
              overflowX: 'auto', 
            }}>
            <div style={{
                  margin: 'auto', // The "magic" that centers AND preserves scrollability
                  padding: '20px',
                  minWidth: '300px', // Example width
                }}>
                <TwoStockCombinations />
            </div>
        </div>
        <p>
        Click and drag the red and orange dots to change the mean return and return variance of the stocks. Use the blue slider to adjust the correlation between the stocks. Note that when correlation is equal to 1, the possible portfolios form a straight line between the two stocks. When correlation is equal to -1, there is a combination of weights 
        that produces a certain (no variance) return.   
        </p>
        <p>
        With all the possible mean and variance combinations laid out for us, we can choose the optimal portfolio based on our taste for risk and desired return. One way to think about this would be to choose a desired return and then pick the portfolio that results in the lowest variance for that return. Another way to think about this would be to choose a 
        level of risk (standard deviation) we are willing to take on and then pick the portfolio with the highest mean return for that risk level. Using these framings, we can see that any portfolio that lies southeast of another portfolio on the graph is suboptimal because it offers (1) a lower return for the same variance, (2) a higher variance for the same return, or (3) both. 
        </p>
        <p className='heading2'>Many Assets</p>
        <p>
        So far, we have been considering a portfolio made up of only two assets: the stock of company Y and the stock of company Z. What if we scale things up to allow for many assets? 
        Suppose there are <MathJax inline>{"\\( N \\)"}</MathJax> assets with mean returns <MathJax inline>{"\\( \\bar R_1, \\bar R_2, \\dots, \\bar R_N \\)"}</MathJax> and return variances <MathJax inline>{"\\( \\sigma_1^2, \\sigma_2^2,\\dots,\\sigma_N^2  \\)"}</MathJax>. 
        Additionally, suppose the correlation between asset <MathJax inline>{"\\( i \\)"}</MathJax> and asset <MathJax inline>{"\\( j \\)"}</MathJax> is given by <MathJax inline>{"\\( \\rho_{i,j} \\)"}</MathJax>. We can construct a portfolio by assigning a weight to each asset <MathJax inline>{"\\( w_1, w_2, \\dots, w_N \\)"}</MathJax> such that 
        all the weights add up to one <MathJax inline>{"\\(\\left(\\sum^N_{i=1}w_i = 1\\right)  \\)"}</MathJax>. The mean return and return variance of this portfolio are given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\bar R_p &= E\\left[\\sum^N_{i=1}w_iR_i\\right] \\\\
            &= \\sum^N_{i=1}w_i\\bar R_i \\\\ \\\\
            \\text{var}(R_p) &= E\\left[\\left(\\sum^N_{i=1}w_iR_i\\right)^2\\right] - \\left(E\\left[\\sum^N_{i=1}w_iR_i\\right]\\right)^2 \\\\
            &= \\sum^N_{i=1}\\sum^N_{j=1}w_iw_j\\left(E[R_iR_j] - E[R_i]E[R_j]\\right) \\\\
            &= \\sum^N_{i=1}\\sum^N_{j=1}w_iw_j\\text{cov}(R_i,R_j) \\\\
            &= \\sum^N_{i=1}\\sum^N_{j=1}w_iw_j\\rho_{i,j}\\sigma_i\\sigma_j \\\\
            &= \\sum^N_{i=1}w_i^2\\sigma_i^2 + 2\\sum^{N-1}_{i=1}\\sum^N_{j=i+1}w_iw_j \\rho_{i,j}\\sigma_i\\sigma_j
            \\end{aligned}
          \\]`}
        </MathJax>  
        </p>
        <p>
        What are the possible mean/variance combinations we can create with many assets? The shaded region in the graph below shows the feasible set of mean return and standard deviation pairs that we can create with three assets. 
        </p>
        <div style={{
              display: 'flex',
              width: '100%',
              overflowX: 'auto', 
            }}>
            <div style={{
                  margin: 'auto', // The "magic" that centers AND preserves scrollability
                  padding: '20px',
                  minWidth: '300px', // Example width
                }}>
                <ThreeStockCombinations />
            </div>
        </div>
        <p>
        Click and drag the dots to change the mean return and return variance of the assets. Use the blue sliders to adjust the correlation between the assets. Note that not all correlation combinations are possible with three assets. Thus, the first two correlations can move freely between -1 and 1, but the third correlation is constrained based on your choices for the other two correlations. 
        With only two assets, the set of feasible portfolios is a line between the two asset points. With three assets, we can form an area of feasible portfolios. When all three correlations are equal to 1, the feasible set becomes a triangle with the three asset points as vertices. 
        </p>
        <p>
        Just as before, a risk-averse investor will not prefer a portfolio that has both higher risk and lower expected return than another available portfolio. On the graph, such portfolios lie to the southeast of a dominating portfolio and are therefore suboptimal. If we eliminate all dominated portfolios and retain only those that offer the highest expected return for each level of risk, the remaining boundary is called the efficient frontier.
        </p>
        <p className='heading2'>Risk-Free Asset</p>
        <p>
        So far, we've been thinking about assets that have an uncertain return, or whose return variance is greater than zero. What happens when we add an asset with no risk (variance = 0)? 
        Suppose we have a risk-free asset (e.g., a Treasury bill) that offers a certain return of <MathJax inline>{"\\( R_f \\)"}</MathJax>. Let's consider a portfolio created with this risk-free asset and a risky asset with return <MathJax inline>{"\\( R_m \\)"}</MathJax> and 
        variance <MathJax inline>{"\\( \\sigma_m^2\\)"}</MathJax>. Suppose we invest a <MathJax inline>{"\\( w \\)"}</MathJax> proportion of our wealth in the risky asset and a <MathJax inline>{"\\( 1 - w\\)"}</MathJax> proportion in the risk-free asset. The mean return and portfolio variance are given by 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
                \\bar R_p &= w\\bar R_m + (1-w)R_f \\\\ \\\\
                \\text{var}(R_p) &= \\text{var}(wR_m + (1-w)R_f ) \\\\
                &= w^2\\sigma_m^2
            \\end{aligned}
          \\]`}
        </MathJax> 
        Thus, the standard deviation of the portfolio (<MathJax inline>{"\\( w\\sigma_m \\)"}</MathJax>) scales linearly with the proportion of wealth invested in the risky asset. What does this mean in terms of our graph relating the standard deviation of a portfolio to its mean return? 
        If I plot the risk-free asset on the y-axis and the risky asset somewhere within the positive quadrant of the graph, I can draw a line between these two points and acheive any risk/return combination along the line. 
        In addition, if I am allowed to borrow money at the risk-free rate and invest additional funds in the risky asset, I can achieve risk/return combinations that lie along this line past the point of the risky asset. 
        Using the two points <MathJax inline>{"\\( (0, R_f)\\)"}</MathJax> and <MathJax inline>{"\\( (\\sigma_m, \\bar R_m)\\)"}</MathJax>, we can come up with an equation for this line. 
        First we'll find the slope 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
                m = \\frac{\\bar R_1 - \\bar R_2}{\\sigma_1 - \\sigma_2} = \\frac{\\bar R_m- R_f}{\\sigma_m}
            \\end{aligned}
          \\]`}
        </MathJax> 
        Then, since the y-intercept is given by <MathJax inline>{"\\( b= R_f\\)"}</MathJax>, the equation for the line is 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
                \\bar R &= \\sigma m + b \\\\
                \\bar R &= \\sigma \\left(\\frac{\\bar R_m- R_f}{\\sigma_m}\\right) + R_f
            \\end{aligned}
          \\]`}   
        </MathJax> 
        The slope of this line is called the Sharpe ratio, which measures how much return an asset offers scaled by its risk. 
        </p>
        <p>
        Using the line created with a risk-free asset and a risky asset, we can create an optimal set of risk/return combinations. 
        To do so, we want to construct our line such that all other portfolios lie beneath it. This ensures that no other portfolio offers a better return for a given risk level than a portfolio on our optimal line.  
        Which risky asset should we use to construct this line?
        </p>
        <p>
        We can start by considering only risky assets along the efficient frontier. The best risky asset lies at the point where a straight line passing through the y-axis at the risk-free return is tangent to the efficient frontier. 
        The graph below shows the efficient frontier using two risky assets and the line connecting the risk-free return to the portfolio tangent to the efficient frontier. This green dotted line is called the capital market line. For each risk level, the capital market line offers 
        the highest possible mean return acheivable through creating a portfolio with the available assets. 
        </p>
        <div style={{
              display: 'flex',
              width: '100%',
              overflowX: 'auto', 
            }}>
            <div style={{
                  margin: 'auto', // The "magic" that centers AND preserves scrollability
                  padding: '20px',
                  minWidth: '300px', // Example width
                }}>
                <CapLine />
            </div>
        </div>
        <p>
        Click and drag the risk-free and risky asset dots to change the capital market line and the tangency portfolio. Use the blue slider to adjust the correlation between the two risky assets.
        </p>
        <p>
        What does the capital market line imply about investing preferences? Risk-averse investors who want to acheive the highest possible mean return for the lowest variance should invest in some combination of just two things: (1) the risk-free asset and (2) the tangency portfolio. 
        The capital market line shows that once a risk-free asset is available, investors no longer need to hold complicated combinations of many risky assets to be efficient. 
        Instead, all efficient portfolios lie along a straight line that combines the risk-free asset with a single optimal risky portfolio (the tangency portfolio). 
        Investors differ only in how much risk they choose to take, not in which risky assets they hold. More conservative investors place more weight on the risk-free asset, while more aggressive investors place more weight on the tangency portfolio 
        (and may even borrow at the risk-free rate to invest more in the tangency portfolio).
        </p>
        <p>
        This result is known as two-fund separation: every optimal portfolio can be formed using the same two funds, regardless of individual risk preferences.
        In equilibrium, if all investors are rational, risk-averse, and face the same investment opportunities, they will all choose the same tangency portfolio. 
        When we aggregate everyone’s choices, that tangency portfolio must be the market portfolio, containing all risky assets weighted by their market values.
        This observation sets the stage for the Capital Asset Pricing Model (CAPM), which asks a natural next question: 
        If everyone holds the market portfolio, how should an individual asset’s expected return be related to its risk?
        </p>
        </MathJaxContext>
        <PageNavigator group="Risk"/>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='TD-link' to="/corporate_finance/risk">Contents</NavLink></div>
        </div>
  );
}

export default Risk4;