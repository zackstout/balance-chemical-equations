

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
// [4 0 0 -1 | 0] // H
// [1 0 -1 0 | 0] // C
// [0 2 -4 -1 | 0] // Cl
// [0 0 0 0 | 0] // We autofill with zeros to get a square matrix (will only work if number of distinct elements is <= number of distinct molecules)

// the algorithm for finding a determinant should be recursive.



function generateMatrix(ins, outs) {
  let parsed_in = parseArray(ins);
  let our_ins = ins.map(mol => parseMolecule(mol));
  let our_outs = outs.map(mol => parseMolecule(mol));
  let equation = our_ins.concat(our_outs);
  let res = [];
  console.log(equation);
  // loop through number of distinct elements in the inputs:
  for (let i=0; i < Object.keys(parsed_in).length; i++) {
    let row = [];
    let elem = Object.keys(parsed_in)[i];
    // console.log(elem);



    // loop through each molecule in the equation:
    for (let j=0; j < equation.length; j++) {
      let sign = j >= our_ins.length ? -1 : 1;
      if (equation[j].hasOwnProperty(elem)) {
        row.push(sign * equation[j][elem]);
        console.log(equation[j], elem);
      } else {
        row.push(0);
      }
    }
    res.push(row);

  }
  return res;
}

console.log(generateMatrix(['CH4', 'Cl2'], ['CCl4', 'HCl']));

// Reagents: {"C": 1, "H": 4, "Cl": 2}
// Products: {"C":, 1, "H": 1, "Cl": 5} // This shouldn't be relevant.

function parseMolecule(str) {
  var res = {};

  for (let i=0; i < str.length; i++) {
    let elem, num;
    if ((/[A-Z]/).test(str[i])) {
      if ((i != str.length - 1) && (/[a-z]/).test(str[i+1])) {
        elem = str[i] + str[i+1];
        // this is wrong, because will miss multiple digits:
        if ((/\d/).test(str[i+2])) {
          num = str[i+2];
          // skip ahead:
          i += 2;
        } else {
          num = 1;
          i += 1;
        }
        res[elem] = parseInt(num);
      } else {
        elem = str[i];

        if ((/\d/).test(str[i+1])) {
          num = str[i+1];
          // skip ahead:
          i++;
        } else {
          num = 1;
        }
        res[elem] = parseInt(num);
      }
    }
  }

  return res;
}

console.log(parseMolecule('Ca2Cl4OSZ'));

// Oh this isn't quite what we want, is it? We also need to keep track of position of molecule in our system.
function parseArray(arr) {
  let res = {};
  // would prob be cleaner to initliaze empty object with 0s....eh maybe only in Python
  arr.forEach(mol => {
    let parsed_mol = parseMolecule(mol);
    Object.keys(parsed_mol).forEach(elem => {
      if (!res.hasOwnProperty(elem)) {
        res[elem] = parsed_mol[elem];
      } else {
        res[elem] += parsed_mol[elem];
      }
    });
  });
  return res;
}

console.log(parseArray(['MgSO4', 'CaCl2', 'CO3']));











let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let matrix2 = [[1, 0, 0, 0], [0, 12, 0, 0], [0, 0, 3, 0], [0, 0, 0, 23]];


// Ooooh this whole time we were forgetting a key piece, it's that coefficient multiplied by the determinant of the sub-matrix...
// Oooh i think i see the problem, we're mutating the array that we're walking through (smallerMatrices)....because the recursive call reassigns it. Whoops.
function calculateDeterminant(matrix, result) {
  // base case:
  if (matrix.length === 2) {
    // console.log(matrix);
    let res = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
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

    smallerMatrices.push({
      coeff: matrix[0][i],
      matrix: newMatrix
    });
  }

  console.log(smallerMatrices);

  // // Get the sum:
  for (let i=0; i < smallerMatrices.length; i++) {
      let sign = i % 2 === 0 ? 1 : -1;
      result += smallerMatrices[i].coeff * sign * calculateDeterminant(smallerMatrices[i].matrix, result);
  }

  return result;
}


var x = calculateDeterminant(matrix, 0);
console.log(x);
// console.log(result);
