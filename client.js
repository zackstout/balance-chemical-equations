

// Takes two arrays. E.g. ['CO2', 'H2O'], ['O2', 'C6H12O6']
function balanceEq(reagents, products) {

}


// Need a function to take a string like 'CO2' and parse into object: {'C': 1, 'O': 2}

// And then haha because math is so fast we could just loop through sets of coefficients until we found the one that worked.

// But it'd be nice to be a little more thoughtful about it.

// probably the most elegant way is to turn it into a system of equations, i.e. a matrix, and then solve that algorithmically.


// Plan: use Cramer's rule. So we'll need to calculate determinants.

// CH4 + Cl2 -> CCl4 + HCl
// Translates to:
// [4 0 0 -1 | 0]
// [1 0 -1 0 | 0]
// [0 2 -4 0 | 0]
// [0 0 0 0 | 0] // We autofill with zeros to get a square matrix (will only work if number of distinct elements is <= number of distinct molecules)

// the algorithm for finding a determinant should be recursive.


let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// Ok it's not paying attention to the second row.......why?? Or rather, it's treating it always as 2.
let matrix2 = [[1, 0, 0, 0], [0, 12, 0, 0], [0, 0, 3, 0], [0, 0, 0, 23]];

// let result = 0;

// let bool = true;



// Ooooh this whole time we were forgetting a key piece, it's that coefficient multiplied by the determinant of the sub-matrix...
// Oooh i think i see the problem, we're mutating the array that we're walking through (smallerMatrices)....because the recursive call reassigns it. Whoops.
function calculateDeterminant(matrix, result) {

  // if (matrix.length === 1 ) return matrix[0][0];
  // base case:
  if (matrix.length === 2) {
    console.log(matrix);
    let res = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    console.log(res);
    // result = bool ? result + res : result - res;
    //
    // bool = !bool;

    // result += res;

    return res;
  }

  smallerMatrices = [];

  // Cool, this triple-loop works
  // Loop through each column in first row:
  for (let i=0; i < matrix.length; i++) {
    newMatrix = [];
    // loop through each remaining row:
    for (let j=1; j < matrix.length; j++) {
      let newRow = [];
      // loop through each element in that row, check if it's in the negated column:
      for (let k=0; k < matrix.length; k++) {
        if (k !== i) {
          newRow.push(matrix[j][k]);
        }
      }
      newMatrix.push(newRow);
    }
    // console.log(newMatrix);
    smallerMatrices.push({
      coeff: matrix[0][i],
      matrix: newMatrix
    });
    // calculateDeterminant(newMatrix);

    // if (newMatrix[0].length == 2) {
    //   // var sign = k % 2 === 0 ? 1 : -1;
    //   result += sign * calculateDeterminant(newMatrix);
    //
    // } else {
    //   calculateDeterminant(newMatrix);
    // }



    // calculateDeterminant(newMatrix);


  }

  console.log(smallerMatrices);

  // let result;


  // let res = smallerMatrices.reduce((t, n) => t + calculateDeterminant(n), 0);

  // console.log(res);
  //
  // // let res = 0;
  //
  // // Get the sum:
  for (let i=0; i < smallerMatrices.length; i++) {
    // if (smallerMatrices[i].matrix[0].length == 2) {
      let sign = i % 2 === 0 ? 1 : -1;
      result += smallerMatrices[i].coeff * sign * calculateDeterminant(smallerMatrices[i].matrix, result);

    // } else {
      // calculateDeterminant(smallerMatrices[i]);
    // }

  }

  // console.log(res);
  return result;
}


var x = calculateDeterminant(matrix2, 0);
console.log(x);
// console.log(result);
