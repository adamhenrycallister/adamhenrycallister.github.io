import React, { useState } from 'react';
import './Stats.css';
import { NavLink } from 'react-router-dom';
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PageNavigator from "../../../components/PageNavigator";
// import ExampleBox from "../../../components/ExampleBox";


function Stats5() {
  return (
        <div className='Stats'>
        <PageNavigator group="Stats" />
        <p className='heading1'>Regression with Multiple Variables</p>
        <MathJaxContext>
        <p>
        In the last section, we expressed the relationship between two random variables using the structure of a line. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            y_i = \\alpha + \\beta x_i + \\varepsilon_i 
            \\end{aligned}
          \\]`}
        </MathJax> 
        What if we wanted to use multiple <MathJax inline>{"\\( x \\)"}</MathJax> variables to predict <MathJax inline>{"\\( y \\)"}</MathJax>? Something like
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            y_i = \\beta_0 + \\beta_1 x_{i,1} + \\beta_2 x_{i,2} + \\beta_3 x_{i,3} + \\varepsilon_i
            \\end{aligned}
          \\]`}
        </MathJax>  
        where <MathJax inline>{"\\( x_{i,1} \\)"}</MathJax>, <MathJax inline>{"\\( x_{i,2} \\)"}</MathJax>, and <MathJax inline>{"\\( x_{i,3} \\)"}</MathJax> all influence the outcome <MathJax inline>{"\\(  y_i \\)"}</MathJax>. Drawing from the example in the last section, perhaps 
        the hours billed on a case are not only influenced by the stakes of the case (<MathJax inline>{"\\( x_{i,1} \\)"}</MathJax>) but also the specific law firm working the case (<MathJax inline>{"\\( x_{i,2} \\)"}</MathJax>) and the type of claims being litigated (<MathJax inline>{"\\( x_{i,3} \\)"}</MathJax>).
        </p>
        <p className='heading2'>Matrix Form</p>
        <p>
        Before we add more variables, we need to rewrite our regression equation in terms of vectors and matrices. First, let's call our intercept term <MathJax inline>{"\\( \\beta_0 \\)"}</MathJax> instead of <MathJax inline>{"\\( \\alpha \\)"}</MathJax>. The equation <MathJax inline>{"\\( y_i = \\beta_0 + \\beta_1 x_i + \\varepsilon_i  \\)"}</MathJax> establishes a relationship for every observation <MathJax inline>{"\\( i \\)"}</MathJax>. Thus, 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            y_1 &= \\beta_0 + \\beta_1 x_1 + \\varepsilon_1 \\\\
            y_2 &= \\beta_0 + \\beta_1 x_2 + \\varepsilon_2 \\\\
            y_3 &= \\beta_0 + \\beta_1 x_3 + \\varepsilon_3  \\\\
            \\vdots \\\\
            y_N &= \\beta_0 + \\beta_1 x_N + \\varepsilon_N 
            \\end{aligned}
          \\]`}
        </MathJax> 
        Instead of writing <MathJax inline>{"\\( N \\)"}</MathJax> equations (one for each observation), we can represent this entire set of equations using vectors and matrices.    
        </p>
        <p>
        If we let <MathJax inline>{"\\( Y =  \\begin{bmatrix} y_1 \\\\ y_2 \\\\ y_3 \\\\ \\vdots \\\\ y_N \\end{bmatrix} \\)"}</MathJax>, <MathJax inline>{"\\( X = \\begin{bmatrix} 1 & x_1 \\\\ 1 & x_2 \\\\ 1 & x_3 \\\\ \\vdots & \\vdots \\\\ 1 & x_N \\end{bmatrix} \\)"}</MathJax>, <MathJax inline>{"\\( \\beta = \\begin{bmatrix} \\beta_0 \\\\ \\beta_1 \\end{bmatrix} \\)"}</MathJax>, and <MathJax inline>{"\\( \\varepsilon = \\begin{bmatrix} \\varepsilon_1 \\\\ \\varepsilon_2 \\\\ \\varepsilon_3 \\\\ \\vdots \\\\ \\varepsilon_N \\end{bmatrix} \\)"}</MathJax>, 
        we can represent all <MathJax inline>{"\\( N \\)"}</MathJax> equations using the form 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\overbrace{\\begin{bmatrix} y_1 \\\\ y_2 \\\\ y_3 \\\\ \\vdots \\\\ y_N \\end{bmatrix}}^{Y} = 
            \\overbrace{\\begin{bmatrix} 1 & x_1 \\\\ 1 & x_2 \\\\ 1 & x_3 \\\\ \\vdots & \\vdots \\\\ 1 & x_N \\end{bmatrix}}^{X}
            \\overbrace{\\begin{bmatrix} \\beta_0 \\\\ \\beta_1 \\end{bmatrix}}^{\\beta} +
            \\overbrace{\\begin{bmatrix} \\varepsilon_1 \\\\ \\varepsilon_2 \\\\ \\varepsilon_3 \\\\ \\vdots \\\\ \\varepsilon_N \\end{bmatrix}}^{\\varepsilon}
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>    
        <p>
        Now, we can easily add more <MathJax inline>{"\\( x \\)"}</MathJax> variables simply by increasing the columns of <MathJax inline>{"\\( X \\)"}</MathJax> and the rows of <MathJax inline>{"\\( \\beta \\)"}</MathJax>. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\overbrace{\\begin{bmatrix} y_1 \\\\ y_2 \\\\ y_3 \\\\ \\vdots \\\\ y_N \\end{bmatrix}}^{Y} = 
            \\overbrace{\\begin{bmatrix} 1 & x_{1,1} & x_{1,2} & x_{1,3} \\\\ 1 & x_{2,1} & x_{2,2} & x_{2,3} \\\\ 1 & x_{3,1} & x_{3,2} & x_{3,3} \\\\ \\vdots & \\vdots \\\\ 1 & x_{N,1} & x_{N,2} & x_{N,3} \\end{bmatrix}}^{X}
            \\overbrace{\\begin{bmatrix} \\beta_0 \\\\ \\beta_1 \\\\ \\beta_2 \\\\ \\beta_3 \\end{bmatrix}}^{\\beta} +
            \\overbrace{\\begin{bmatrix} \\varepsilon_1 \\\\ \\varepsilon_2 \\\\ \\varepsilon_3 \\\\ \\vdots \\\\ \\varepsilon_N \\end{bmatrix}}^{\\varepsilon}
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Matrix Rules</p>
        <p>
        Before we find estimates for our vector of betas, we need to review a few properties of matrices. Let's consider the following matrices:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            A = \\begin{bmatrix} 2 & 1 \\\\ 3 & 4 \\end{bmatrix} \\qquad 
            B = \\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix} \\qquad
            C = \\begin{bmatrix} 1 & 2 \\\\ 2 & 3 \\\\ 1 & 2  \\end{bmatrix} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        The dimension of a matrix is the number of rows by the number of columns. <MathJax inline>{"\\( A \\)"}</MathJax> and <MathJax inline>{"\\( B \\)"}</MathJax> are <MathJax inline>{"\\( 2\\times 2 \\)"}</MathJax> matrices and <MathJax inline>{"\\( C \\)"}</MathJax> is 
        a <MathJax inline>{"\\( 3 \\times 2 \\)"}</MathJax> matrix. 
        </p>
        <p>
        We can add and subtract matrices if they have the same dimension. We do this by applying the operator to each individual entry. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            A - B &= \\begin{bmatrix} 2 - 1 & 1 - 3\\\\ 3 - 2 & 4 - 4\\end{bmatrix}
            = \\begin{bmatrix} 1 & -2 \\\\ 1 & 0 \\end{bmatrix} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        To multiply a matrix by a scalar (a non-matrix), we simply distribute the scalar through.
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            3A  &= \\begin{bmatrix} 3\\times2 & 3\\times1 \\\\ 3\\times3 & 3\\times4 \\end{bmatrix}
            = \\begin{bmatrix} 6 & 3 \\\\ 9 & 12 \\end{bmatrix} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        If we want to multiply two matrices together, we first need to make sure that their dimensions line up. Unlike scalar multiplication, order matters in matrix multiplication. 
        Multiplication is only possible if the number of columns on the first matrix is equal to the number of rows on the second matrix. Put differently, a matrix of dimension <MathJax inline>{"\\( p \\times n \\)"}</MathJax> can only multiply with matrices of dimension <MathJax inline>{"\\( n \\times q \\)"}</MathJax>, where <MathJax inline>{"\\( p \\)"}</MathJax> and <MathJax inline>{"\\( q \\)"}</MathJax> can be any positive integers. 
        The result of multiplying a <MathJax inline>{"\\( p \\times n \\)"}</MathJax> matrix with a <MathJax inline>{"\\( n \\times q \\)"}</MathJax> matrix will be a matrix of dimension <MathJax inline>{"\\( p \\times q \\)"}</MathJax>.
        </p>
        <p>
        To multiply matrices, we take the sum of the product of each row on the first matrix with each column on the second matrix. For example, 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            AB &= \\begin{bmatrix} 2 & 1 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix}  = \\begin{bmatrix} (2)(1) + (1)(2) & (2)(3) + (1)(4) \\\\ (3)(1) + (4)(2) & (3)(3) + (4)(4) \\end{bmatrix} 
            = \\begin{bmatrix} 4 & 10 \\\\ 11 & 25 \\end{bmatrix} \\\\ \\\\
            BA &= \\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix} \\begin{bmatrix} 2 & 1 \\\\ 3 & 4 \\end{bmatrix} = \\begin{bmatrix} (1)(2) + (3)(3) &  (1)(1) + (3)(4)  \\\\  (2)(2) + (4)(3) & (2)(1) + (4)(4) \\end{bmatrix} 
            = \\begin{bmatrix} 11 & 13 \\\\ 16 & 10 \\end{bmatrix} \\\\ \\\\
            CA &= \\begin{bmatrix} 1 & 2 \\\\ 2 & 3 \\\\ 1 & 2  \\end{bmatrix} \\begin{bmatrix} 2 & 1 \\\\ 3 & 4 \\end{bmatrix}  = \\begin{bmatrix} (1)(2) + (2)(3) & (1)(1) + (2)(4)  \\\\  (2)(2) + (3)(3) & (2)(1) + (3)(4)  \\\\ (1)(2) + (1)(3) & (1)(1) + (2)(4) \\end{bmatrix} = \\begin{bmatrix} 8 & 9 \\\\ 13 & 14 \\\\ 5 & 9 \\end{bmatrix}
            \\end{aligned} 
          \\]`}
        </MathJax> 
        Note that <MathJax inline>{"\\( AB \\neq BA \\)"}</MathJax> and the multiplication <MathJax inline>{"\\( AC \\)"}</MathJax> is not possible because <MathJax inline>{"\\( \\text{col}(A) = 2 \\neq 3 = \\text{row}(C) \\)"}</MathJax>.
        </p>
        <p>
        The transpose of a matrix converts rows into columns. We use <MathJax inline>{"\\( A' \\)"}</MathJax> to denote the transpose of <MathJax inline>{"\\( A \\)"}</MathJax>. For example, consider the transposes of <MathJax inline>{"\\( A \\)"}</MathJax>, <MathJax inline>{"\\( B \\)"}</MathJax>, and <MathJax inline>{"\\( C \\)"}</MathJax>
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            A &= \\begin{bmatrix} 2 & 1 \\\\ 3 & 4 \\end{bmatrix} \\qquad 
            B = \\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix} \\qquad
            C = \\begin{bmatrix} 1 & 2 \\\\ 2 & 3 \\\\ 1 & 2  \\end{bmatrix} \\\\ \\\\
            A' &= \\begin{bmatrix} 2 & 3 \\\\ 1 & 4 \\end{bmatrix} \\qquad 
            B' = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\qquad
            C' = \\begin{bmatrix} 1 & 2 & 1 \\\\ 2 & 3 & 2 \\end{bmatrix} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        A transpose can distribute into a matrix sum or product. However, a transpose will reverse the order of multiplication. Taking the transpose twice simply returns the original matrix. For example,
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            (A + B)' &= A' + B' \\\\
            (AB)' &= B'A' \\\\
            [(BC')' + CAB]' &= BC' + B'A'C'
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p>
        Instead of matrix division, we have inverse matrices. Only square matrices (matrices with the same number of rows and columns) can have an inverse. (Not all square matrices have inverses; a matrix is invertible only if its determinant is nonzero.) 
        The product of a square matrix and its inverse results in the indentity matrix, which is a matrix of ones along the diagonal and zero everywhere else. 
        The inverse of a <MathJax inline>{"\\( 2\\times 2 \\)"}</MathJax> matrix is can be found as follows:
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            M &= \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\\\ \\\\
            M^{-1} &= \\overbrace{\\frac{1}{ad - bc}}^{\\text{determinant}}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        For example, we can find the inverse of <MathJax inline>{"\\( A \\)"}</MathJax> as
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            A &= \\begin{bmatrix} 2 & 1 \\\\ 3 & 4 \\end{bmatrix}  \\\\ \\\\
            A^{-1} &= \\frac{1}{(2)(4) - (1)(3)}\\begin{bmatrix} 4 & -1 \\\\ -3 & 2 \\end{bmatrix} 
            = \\frac{1}{5}\\begin{bmatrix} 4 & -1 \\\\ -3 & 2 \\end{bmatrix} 
            \\end{aligned}
          \\]`}
        </MathJax> 
        We can show that this is the inverse by considering 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            AA^{-1} &= \\frac{1}{5}\\begin{bmatrix} 2 & 1 \\\\ 3 & 4 \\end{bmatrix}\\begin{bmatrix} 4 & -1 \\\\ -3 & 2 \\end{bmatrix} \\\\
            &= \\frac{1}{5}\\begin{bmatrix} (2)(4) + (1)(-3) & (2)(-1) + (1)(2) \\\\ (3)(4) + (4)(-3) & (3)(-1) + (4)(2)\\end{bmatrix} \\\\
            &= \\frac{1}{5}\\begin{bmatrix} 5 &  0 \\\\ 0 & 5 \\end{bmatrix} \\\\
            &= \\underbrace{\\begin{bmatrix} 1 &  0 \\\\ 0 & 1 \\end{bmatrix}}_{\\text{identity }(I)}
            \\end{aligned} 
          \\]`}
        </MathJax> 
        The identity matrix is special because multiplication by the identity does not change the other matrix. For example, 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            AI = IA = A
            \\end{aligned} 
          \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Matrix Derivatives</p>
        <p>
        The final thing we need before we find an estimate for the betas is the ability to take a derivative with matrices. Suppose we have a vector of variables 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            Z &= \\begin{bmatrix} z_1 \\\\ z_2 \\\\ \\vdots \\\\ z_K \\end{bmatrix}
            \\end{aligned}
          \\]`}
        </MathJax> 
        We want to consider the derivative of two different expressions. First, what happens when we take the derivative of <MathJax inline>{"\\( Z \\)"}</MathJax> multiplied by a vector of constants <MathJax inline>{"\\( D = \\begin{bmatrix} d_1 \\\\ d_2 \\\\ \\vdots \\\\ d_K \\end{bmatrix} \\)"}</MathJax>?
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\frac{\\partial }{\\partial Z}(D'Z) = \\frac{\\partial }{\\partial Z}(Z'D) = D
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p>
        Second, what happens when we take the derivative of <MathJax inline>{"\\( Z'HZ \\)"}</MathJax> where <MathJax inline>{"\\( H \\)"}</MathJax> is a <MathJax inline>{"\\( K \\times K \\)"}</MathJax> matrix of constants?
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\frac{\\partial }{\\partial Z}(Z'HZ) = (H + H')Z
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Solving for Beta</p>
        <p>
        With these matrix properties in mind, we are ready to consider the problem of minimizing the sum of the squared error. Recall the matrix form of the regression equation 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            Y = X\\beta + \\varepsilon
            \\end{aligned}
          \\]`}
        </MathJax> 
        We'll say we are considering <MathJax inline>{"\\( N \\)"}</MathJax> observations and <MathJax inline>{"\\( K \\)"}</MathJax> variables (including the intercept). 
        This makes <MathJax inline>{"\\( Y \\)"}</MathJax> and <MathJax inline>{"\\( \\varepsilon \\)"}</MathJax> <MathJax inline>{"\\( N \\times 1 \\)"}</MathJax> vectors; <MathJax inline>{"\\( X \\)"}</MathJax> a <MathJax inline>{"\\( N \\times K \\)"}</MathJax> matrix; and <MathJax inline>{"\\( \\beta \\)"}</MathJax> a <MathJax inline>{"\\( K \\times 1 \\)"}</MathJax> vector.
        First, we can write the sum of the squared error in matrix form as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\varepsilon'\\varepsilon = \\begin{bmatrix} \\varepsilon_1 & \\varepsilon_2 & \\dots & \\varepsilon_N \\end{bmatrix}\\begin{bmatrix} \\varepsilon_1 \\\\ \\varepsilon_2 \\\\ \\vdots \\\\ \\varepsilon_N \\end{bmatrix}
            = \\varepsilon_1\\varepsilon_1 + \\varepsilon_2\\varepsilon_2 + \\dots + \\varepsilon_N\\varepsilon_N
            = \\sum^N_{i=1} \\varepsilon_i^2
            \\end{aligned}
          \\]`}
        </MathJax> 
        This let's us write the minimization problem as 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\underset{\\beta}{\\text{min}} \\; \\varepsilon' \\varepsilon 
            &= \\underset{\\beta}{\\text{min}} \\; (Y - X\\beta)'(Y - X\\beta) \\\\
            &= \\underset{\\beta}{\\text{min}} \\; (Y' - \\beta'X')(Y - X\\beta) \\\\
             &= \\underset{\\beta}{\\text{min}} \\; [Y'Y - Y'X\\beta - \\beta'X'Y + \\beta'X'X\\beta]
            \\end{aligned}
          \\]`}
        </MathJax> 
        If we take a derivative with respect to our vector <MathJax inline>{"\\( \\beta \\)"}</MathJax>, the <MathJax inline>{"\\( Y'Y \\)"}</MathJax> will go away. Let's consider what happens to the <MathJax inline>{"\\( Y'X\\beta \\)"}</MathJax> and <MathJax inline>{"\\( \\beta'X'Y \\)"}</MathJax> terms.
        Note that the second of these terms is the transpose of the first (<MathJax inline>{"\\( (Y'X\\beta)' = \\beta' X' Y \\)"}</MathJax>). Next, note that <MathJax inline>{"\\( X' Y \\)"}</MathJax> has dimension <MathJax inline>{"\\( (K \\times N) \\times (N \\times 1) \\rightarrow K \\times 1 \\)"}</MathJax>. Thus, we are considering the derivative of <MathJax inline>{"\\( \\beta \\)"}</MathJax> multiplied by a vector of constants. 
        This means both of these terms become <MathJax inline>{"\\( X'Y \\)"}</MathJax>.
        </p>
        <p>
        Now let's consider what happens to the <MathJax inline>{"\\( \\beta'X'X\\beta \\)"}</MathJax> term. Note that <MathJax inline>{"\\( X'X \\)"}</MathJax> has dimension <MathJax inline>{"\\( (K \\times N) \\times (N \\times K) \\rightarrow K \\times K \\)"}</MathJax>. Thus, we have a square matrix sandwiched between <MathJax inline>{"\\( \\beta\\, \\)"}</MathJax>'s. This means the derivative of this term 
        is given by <MathJax inline>{"\\( (X'X + (X'X)')\\beta \\)"}</MathJax>.
        </p>
        <p>
        Putting everything together and setting the derivative equal to zero, we have 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            &\\frac{\\partial}{\\partial \\beta}(Y'Y - Y'X\\beta - \\beta'X'Y + \\beta'X'X\\beta) = 0 \\\\
            &\\Leftrightarrow -X'Y - X'Y + (X'X + (X'X)')\\beta = 0 \\\\
            &\\Leftrightarrow -2X'Y + 2X'X\\beta = 0 \\\\
            &\\Leftrightarrow X'X\\beta = X'Y
            \\end{aligned}
          \\]`}
        </MathJax> 
        Here, <MathJax inline>{"\\( X'X \\)"}</MathJax> is a <MathJax inline>{"\\( K \\times K \\)"}</MathJax> matrix. Thus, we can't simply divide both sides by <MathJax inline>{"\\( X'X \\)"}</MathJax>. Instead, we multiply both sides by the inverse of <MathJax inline>{"\\( X'X \\)"}</MathJax>. This gives us our final expression for estimating the coefficients. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\hat \\beta = (X'X)^{-1}X'Y
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p className='heading2'>Single Variable Case</p>
        <p>
        The expression we derived generalizes to any number of <MathJax inline>{"\\( x \\)"}</MathJax> variables we want to consider. We can check that it will give us the same answer as the single variable case by solving 
        for <MathJax inline>{"\\( \\hat \\beta \\)"}</MathJax> with only one <MathJax inline>{"\\( x \\)"}</MathJax> variable. In this case, we have <MathJax inline>{"\\( X =  \\begin{bmatrix} 1 & x_1 \\\\ 1 & x_2 \\\\ \\vdots & \\vdots \\\\ 1 & x_N \\end{bmatrix} \\)"}</MathJax> and  <MathJax inline>{"\\( \\beta =  \\begin{bmatrix} \\beta_0 \\\\ \\beta_1 \\end{bmatrix} \\)"}</MathJax>. 
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\hat \\beta = \\begin{bmatrix} \\hat \\beta_0 \\\\ \\hat \\beta_1 \\end{bmatrix} &= (X'X)^{-1}X'Y \\\\
            &= \\left(\\begin{bmatrix} 1 & 1 & \\dots & 1 \\\\ x_1 & x_2 & \\dots & x_N \\end{bmatrix}  \\begin{bmatrix} 1 & x_1 \\\\ 1 & x_2 \\\\ \\vdots & \\vdots \\\\ 1 & x_N \\end{bmatrix} \\right)^{-1}
            \\begin{bmatrix} 1 & 1 & \\dots & 1 \\\\ x_1 & x_2 & \\dots & x_N \\end{bmatrix} \\begin{bmatrix} y_1 \\\\ y_2 \\\\ \\vdots \\\\ y_N \\end{bmatrix} \\\\
            &= \\left( \\begin{bmatrix} N & \\sum^N_{i=1} x_i \\\\ \\sum^N_{i=1} x_i & \\sum^N_{i=1} x_i^2 \\end{bmatrix} \\right)^{-1} \\begin{bmatrix} \\sum^N_{i=1} y_i \\\\ \\sum^N_{i=1} x_iy_i \\end{bmatrix} \\\\
            &= \\left( \\begin{bmatrix} 1 & \\frac{1}{N}\\sum^N_{i=1} x_i \\\\ \\frac{1}{N}\\sum^N_{i=1} x_i & \\frac{1}{N}\\sum^N_{i=1} x_i^2 \\end{bmatrix} \\right)^{-1} \\begin{bmatrix} \\frac{1}{N}\\sum^N_{i=1} y_i \\\\ \\frac{1}{N} \\sum^N_{i=1} x_iy_i \\end{bmatrix} \\\\
            &= \\left( \\begin{bmatrix} 1 & \\bar x \\\\ \\bar x & \\frac{1}{N}\\sum^N_{i=1} x_i^2 \\end{bmatrix} \\right)^{-1} \\begin{bmatrix} \\bar y \\\\ \\frac{1}{N} \\sum^N_{i=1} x_iy_i \\end{bmatrix} \\\\
            &= \\frac{1}{\\frac{1}{N}\\sum^N_{i=1} x_i^2 - \\bar x^2} \\begin{bmatrix} \\frac{1}{N}\\sum^N_{i=1} x_i^2 & - \\bar x \\\\ - \\bar x &  1\\end{bmatrix} \\begin{bmatrix} \\bar y \\\\ \\frac{1}{N} \\sum^N_{i=1} x_iy_i \\end{bmatrix} \\\\
            &= \\frac{1}{\\frac{1}{N}\\sum^N_{i=1} x_i^2 - \\bar x^2} \\begin{bmatrix} \\left(\\frac{1}{N} \\sum^N_{i=1} x_i^2\\right)\\bar y - \\left(\\frac{1}{N} \\sum^N_{i=1} x_i y_i\\right) \\bar x\\\\ - \\bar x \\bar y + \\frac{1}{N}\\sum^N_{i=1} x_iy_i  \\end{bmatrix} \\\\
            &= \\frac{1}{\\frac{1}{N}\\sum^N_{i=1} x_i^2 - \\bar x^2} \\begin{bmatrix} \\left(\\frac{1}{N} \\sum^N_{i=1} x_i^2\\right)\\bar y - \\left(\\frac{1}{N} \\sum^N_{i=1} x_i y_i\\right) \\bar x + \\bar x^2 \\bar y - \\bar x^2 \\bar y \\\\ \\frac{1}{N}\\sum^N_{i=1} x_iy_i - \\bar x \\bar y  \\end{bmatrix} \\\\          
            &= \\frac{1}{\\frac{1}{N}\\sum^N_{i=1} x_i^2 - \\bar x^2} \\begin{bmatrix} \\left(\\frac{1}{N}\\sum^N_{i=1} x_i^2 - \\bar x^2\\right)\\bar y - \\left(\\frac{1}{N}\\sum^N_{i=1} x_iy_i - \\bar x \\bar y \\right) \\bar x  \\\\ \\frac{1}{N}\\sum^N_{i=1} x_iy_i - \\bar x \\bar y  \\end{bmatrix} \\\\       
            &= \\begin{bmatrix} \\bar y - \\hat \\beta_1 \\bar x \\\\ \\frac{s_{x,y}}{s_x^2} \\end{bmatrix}
            \\end{aligned}
          \\]`}
        </MathJax> 
        </p>
        <p>
        This is the same result we derived in the last section when considering a single variable.
        </p>
        <p className='heading2'>Matrices Simplify Notation</p>
        <p>
        Matrix notation cleanly describes the solution for our coefficient estimates under any number of variables. 
        This becomes increasingly important as we consider more variables. 
        In the case of two variables, <MathJax inline>{"\\( x_1 \\)"}</MathJax> and <MathJax inline>{"\\( x_2 \\)"}</MathJax>, 
        the solution <MathJax inline>{"\\( (X'X)^{-1}(X'Y) \\)"}</MathJax> returns a <MathJax inline>{"\\( 3 \\times 1 \\)"}</MathJax> vector of coefficients given by
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\hat \\beta = \\begin{bmatrix} \\hat \\beta_0 \\\\ \\hat \\beta_1 \\\\ \\hat \\beta_2 \\end{bmatrix} &= (X'X)^{-1}X'Y \\\\
            &= \\left(\\begin{bmatrix} 1 & 1 & \\dots & 1 \\\\ x_{1,1} & x_{2,1} & \\dots & x_{N,1} \\\\ x_{1,2} & x_{2,2} & \\dots & x_{N,2} \\end{bmatrix}  \\begin{bmatrix} 1 & x_{1,1} & x_{1,2} \\\\ 1 & x_{2,1} & x_{2,2} \\\\ \\vdots & \\vdots & \\vdots \\\\ 1 & x_{N,1} & x_{N,2} \\end{bmatrix} \\right)^{-1}
            \\begin{bmatrix} 1 & 1 & \\dots & 1 \\\\ x_{1,1} & x_{2,1} & \\dots & x_{N,1} \\\\ x_{1,2} & x_{2,2} & \\dots & x_{N,2} \\end{bmatrix} \\begin{bmatrix} y_1 \\\\ y_2 \\\\ \\vdots \\\\ y_N \\end{bmatrix} \\\\
            &= \\begin{bmatrix} \\bar y - \\hat \\beta_1 \\bar x_1 - \\hat \\beta_2 \\bar x_2 \\\\ \\frac{s_{1,y}s^2_2 - s_{2,y}s_{1,2}}{s_1^2s_2^2 - s^2_{1,2}} \\\\ \\frac{s_{2,y}s^2_1 - s_{1,y}s_{1,2}}{s_1^2s_2^2 - s^2_{1,2}}  \\end{bmatrix} 
            \\end{aligned}
          \\]`}
        </MathJax>
        Where <MathJax inline>{"\\( s_1^2 \\)"}</MathJax> is the variance of <MathJax inline>{"\\( x_1 \\)"}</MathJax>;  <MathJax inline>{"\\( s_2^2 \\)"}</MathJax> is 
        the variance of <MathJax inline>{"\\( x_2 \\)"}</MathJax>; <MathJax inline>{"\\( s_{1,2} \\)"}</MathJax> is 
        the covariance of <MathJax inline>{"\\( x_1 \\)"}</MathJax> and <MathJax inline>{"\\( x_2 \\)"}</MathJax>; <MathJax inline>{"\\( s_{1,y} \\)"}</MathJax> is 
        the covariance of <MathJax inline>{"\\( x_1 \\)"}</MathJax> and <MathJax inline>{"\\( y \\)"}</MathJax>; and <MathJax inline>{"\\( s_{2,y} \\)"}</MathJax> is 
        the covariance of <MathJax inline>{"\\( x_2 \\)"}</MathJax> and <MathJax inline>{"\\( y \\)"}</MathJax>.
        </p>
        <p>
        In the case of three variables, we have a <MathJax inline>{"\\( 4 \\times 1 \\)"}</MathJax> vector of coefficients given by
        <MathJax className='math-container'>
          {`\\[
            \\begin{aligned}
            \\hat \\beta = \\begin{bmatrix} \\hat \\beta_0 \\\\ \\hat \\beta_1 \\\\ \\hat \\beta_2 \\\\ \\hat \\beta_3 \\end{bmatrix} &= (X'X)^{-1}X'Y \\\\
            &= \\left(\\begin{bmatrix} 1 & 1 & \\dots & 1 \\\\ x_{1,1} & x_{2,1} & \\dots & x_{N,1} \\\\ x_{1,2} & x_{2,2} & \\dots & x_{N,2} \\\\ x_{1,3} & x_{2,3} & \\dots & x_{N,3} \\end{bmatrix}  \\begin{bmatrix} 1 & x_{1,1} & x_{1,2} & x_{1,3} \\\\ 1 & x_{2,1} & x_{2,2} & x_{2,3} \\\\ \\vdots & \\vdots & \\vdots & \\vdots \\\\ 1 & x_{N,1} & x_{N,2} & x_{N,3}\\end{bmatrix} \\right)^{-1}
            \\begin{bmatrix} 1 & 1 & \\dots & 1 \\\\ x_{1,1} & x_{2,1} & \\dots & x_{N,1} \\\\ x_{1,2} & x_{2,2} & \\dots & x_{N,2} \\\\ x_{1,3} & x_{2,3} & \\dots & x_{N,3}  \\end{bmatrix} \\begin{bmatrix} y_1 \\\\ y_2 \\\\ \\vdots \\\\ y_N \\end{bmatrix} \\\\
            &= \\begin{bmatrix} 
            \\bar y - \\hat \\beta_1 \\bar x_1 - \\hat \\beta_2 \\bar x_2 - \\hat \\beta_3 \\bar x_3 \\\\ 
            \\frac{s_{1,y}\\left(s^2_2s^2_3 - s^2_{2,3}\\right) + s_{2,y}\\left(s_{1,3}s_{2,3} - s^2_3s_{1,2}\\right) + s_{3,y}\\left(s_{1,2}s_{2,3} - s^2_2s_{1,3}\\right)}{s_1^2s_2^2s^2_3 - s^2_1s^2_{2,3} - s^2_2s^2_{1,3} - s^2_3s^2_{1,2} + 2s_{1,2}s_{1,3}s_{2,3}} \\\\ 
            \\frac{s_{1,y}\\left(s_{1,3}s_{2,3} - s^2_3s_{1,2}\\right) + s_{2,y}\\left(s^2_1s^2_3 - s^2_{1,3}\\right) + s_{3,y}\\left(s_{1,2}s_{1,3} - s^2_1s_{2,3}\\right)}{s_1^2s_2^2s^2_3 - s^2_1s^2_{2,3} - s^2_2s^2_{1,3} - s^2_3s^2_{1,2} + 2s_{1,2}s_{1,3}s_{2,3}} \\\\ 
            \\frac{s_{1,y}\\left(s_{1,2}s_{2,3} - s^2_2s_{1,3}\\right) + s_{2,y}\\left(s_{1,2}s_{1,3} - s^2_1s_{2,3}\\right) + s_{3,y}\\left(s^2_1s^2_2 - s^2_{1,2}\\right)}{s_1^2s_2^2s^2_3 - s^2_1s^2_{2,3} - s^2_2s^2_{1,3} - s^2_3s^2_{1,2} + 2s_{1,2}s_{1,3}s_{2,3}} \\\\ 
            \\end{bmatrix} 
            \\end{aligned}
          \\]`}
        </MathJax>
        </p>
        <p>
        As we add more and more variables, the solution for any individual coefficient estimate becomes an increasingly complex function of variances and covariances. 
        Matrix notation allows us to abstract away from this complexity. 
        </p>
        </MathJaxContext>
      <PageNavigator group="Stats"/>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><NavLink className='BS-link' to="/stats">Contents</NavLink></div>
        </div>
  );
}
export default Stats5;