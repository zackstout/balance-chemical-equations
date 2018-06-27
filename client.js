

// Takes two arrays. E.g. ['CO2', 'H2O'], ['O2', 'C6H12O6']
function balanceEq(reagents, products) {

}

// Great, this works!:
console.log(math);


const mat = [[1, 0, 0], [0, 2, 3], [0, 0, 4]];
const vec = [1, 2, 3];

// very useful to know this exists, though not going to work here because the zero-vector will always be a solution:
console.log(math.lusolve(mat, vec));




function multiplyMatrixAndVector(mat, vec) {
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

console.log(dotProduct([1, 2], [2,3]));

console.log(dotProduct([1, 1, 1, 1], [4, 0, 0, -1]));

function dotProduct(v1, v2) {
  let res = 0;
  if (v1.length !== v2.length) {
    throw new Error('same length fool!');
  }
  for (let i=0; i < v1.length; i++) {
    res += v1[i] * v2[i];
  }
  return res;
}

// Say len is 5, max is 4, we want [1, 0, 0, 0], [2, 0, 0, 0], ....
// One method, taken from online:
// function generateTests(chars) {
//   let res = [];
//
//   var f = function(prefix, chars) {
//     for (var i=0; i < chars.length; i++) {
//       res.push(prefix + chars[i]);
//       f(prefix + chars[i], chars.slice(i + 1));
//     }
//   };
//
//   f('', chars);
//
//   return res;
// }
//
// let tests = generateTests([0, 1, 2, 3, 4, 5]);
// console.log(tests);


// I think my approach will be to convert to base-x counting, count up to max number, create corresponding array for each number.
// So if our max is 5, we're dealing with base-6. Max number (if len is 3) would be 6^3 - 1.

function genTests(max, len) {
  var base = max + 1;
  var maxNum = Math.pow(base, len) - 1;
  console.log(maxNum);

  let res = [];
  for (let i=0; i < maxNum; i++) {
    var num = i.toString(base);
    // console.log(num);
    // add leading zeros:
    while (num.length < len) {
      num = '0' + num;
    }
    res.push(num.split(''));
  }
  return res;
}







console.log(parseInt('7', 6));
let num = 7;

console.log(num.toString(6));

let tests = genTests(3, 5);
console.log(tests);

// Takes in e.g. (6, 7), returns 11 (which is 7 in base 6).
// Woww, this is a good challenge, but I'm glad we don't have to do it:
function convertToBase(n, x) {
  let res = '';
  let counter = 0;

  while (x >= n) {
    var val = Math.pow(n, counter);
  }
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

// x<i> = det(A<i>)/det(A), where A<i> is A with ith column replaced with zeros (in our case):
// WAAAAAIT a second, Cramers Rule won't work -- our matrices always (or often) have determinant of 0!!!!!
function applyCramersRule(mat) {
  let res = [];
  for (let i=0; i < mat.length; i++) {

  }
}

function generateMatrix(ins, outs) {
  let parsed_in = parseArray(ins);
  let our_ins = ins.map(mol => parseMolecule(mol));
  let our_outs = outs.map(mol => parseMolecule(mol));
  let equation = our_ins.concat(our_outs);
  let res = [];
  // console.log(equation);
  // loop through number of distinct elements in the inputs:
  for (let i=0; i < Object.keys(parsed_in).length; i++) {
    let row = [];
    let elem = Object.keys(parsed_in)[i];

    // loop through each molecule in the equation:
    for (let j=0; j < equation.length; j++) {
      let sign = j >= our_ins.length ? -1 : 1;
      if (equation[j].hasOwnProperty(elem)) {
        row.push(sign * equation[j][elem]); // aha, had i instead of j
      } else {
        row.push(0);
      }
    }
    res.push(row);

  }
  // populate rest of matrix if necessary: (not worrying about other possibility for now)
  while (res.length < res[0].length) {
    let row = new Array(res[0].length).fill(0);
    res.push(row);
  }

  return res;
}

let matrix3 = generateMatrix(['CH4', 'Cl2'], ['CCl4', 'HCl']);
console.log(matrix3);

let sol = solveMatrix(matrix3);
console.log(sol);

console.log(multiplyMatrixAndVector(matrix3, [1, 4, 1, 4]) == [0, 0, 0, 0]);

function solveMatrix(mat) {
  // first number tells our genTests function how many tests to generate.
  // In fact, we shouldn't do it this way, we should check them as we're generating them so that we don't needlessly generate ones that won't be checked.
  let ourTests = genTests(8, mat.length);
  console.log(ourTests);
  let res = [];

  console.log(mat);

  console.log(multiplyMatrixAndVector(mat, [1, 4, 1, 4]));

  // let ourTestsInts = ourTests.map(test => {
  //   // console.log(test);
  //   return test.map(t => {
  //     // console.log(t);
  //     return parseInt(t);
  //   });
  // });

  let ourTestsInts = ourTests.map(test => test.map(t => parseInt(t)));

  // Ignore first one, which is [0, 0, 0, ..., 0]:
  // Oh and we also want to ignore *any* solutions containing a 0....
  for (let i=1; i < ourTestsInts.length; i++) {
    let test = ourTestsInts[i];
    // console.log(test);
    // if (test == [1, 4, 1, 4]) console.log('what up hhhhh');

    let result = multiplyMatrixAndVector(mat, test);
    let target = new Array(mat.length).fill(0);

    // Ooooh you can't check for equality of matrices with ==:
    if (result.join(',') == target.join(',') && !test.includes(0)) {
      res = test;
      break;
    }
  }

  // console.log(ourTests);
  // console.log(ourTestsInts);
  return res;
}


console.log(['1', '2'].map(x => parseInt(x)));






console.log(multiplyMatrixAndVector(matrix3, [1, 4, 1, 4]));

let solution = math.lusolve(matrix3, [0, 0, 0, 0]);
console.log(solution);

console.log(math.lup(matrix3));

console.log(calculateDeterminant(matrix3, 0));


















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

// Oh this isn't quite what we want, is it? We also need to keep track of position of molecule in our system. Still useful though, just could have been simpler (array of unique elements) for the purposes we end up using it for.
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
