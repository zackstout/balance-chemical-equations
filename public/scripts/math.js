
export function multiplyMatrixAndVector(mat, vec) {
  let res = [];
  // console.log(mat, vec, 'HIHIHHIHI');
  if (mat.length !== vec.length) {
    throw new Error('same length fool!');
  }
  for (let i=0; i < mat.length; i++) {
    res.push(dotProduct(mat[i], vec));
  }
  return res;
}


export function dotProduct(v1, v2) {
  let res = 0;
  if (v1.length !== v2.length) {
    throw new Error('same length fool!');
  }
  for (let i=0; i < v1.length; i++) {
    res += v1[i] * v2[i];
  }
  return res;
}


// Ooooh this whole time we were forgetting a key piece, it's that coefficient multiplied by the determinant of the sub-matrix...
// Oooh i think i see the problem, we're mutating the array that we're walking through (smallerMatrices)....because the recursive call reassigns it. Whoops.
export function calculateDeterminant(matrix, result) {
  // base case:
  if (matrix.length === 2) {
    let res = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    return res;
  }

  let smallerMatrices = [];

  // Loop through each column in first row:
  for (let i=0; i < matrix.length; i++) {
    let newMatrix = [];
    // Loop through each remaining row:
    for (let j=1; j < matrix.length; j++) {
      let newRow = [];
      // Loop through each element in that row, check if it's in the negated column:
      for (let k=0; k < matrix.length; k++) {
        if (k !== i) {
          newRow.push(matrix[j][k]);
        }
      }
      newMatrix.push(newRow);
    }

    smallerMatrices.push({
      coeff: matrix[0][i],
      matrix: newMatrix
    });
  }

  // // Get the sum:
  for (let i=0; i < smallerMatrices.length; i++) {
      let sign = i % 2 === 0 ? 1 : -1;
      result += smallerMatrices[i].coeff * sign * calculateDeterminant(smallerMatrices[i].matrix, result);
  }

  return result;
}
