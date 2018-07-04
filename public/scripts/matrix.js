
import { multiplyMatrixAndVector } from './math.js';
import { dotProduct } from './math.js';
import { calculateDeterminant } from './math.js';

import { parseMolecule } from './molecules.js';
import { parseArray } from './molecules.js';


// I think my approach will be to convert to base-x counting, count up to max number, create corresponding array for each number.
// So if our max is 5, we're dealing with base-6. Max number (if len is 3) would be 6^3 - 1.
export function genTests(max, len) {
  var base = max + 1;
  var maxNum = Math.pow(base, len) - 1;
  console.log(maxNum);

  let res = [];
  for (let i=0; i < maxNum; i++) {
    var num = i.toString(base);

    // add leading zeros:
    while (num.length < len) {
      num = '0' + num;
    }
    res.push(num.split(''));
  }
  return res;
}

export function getMols(arr) {
  // let parsed = parseArray(arr);
  return arr.map(mol => parseMolecule(mol));
}


export function generateMatrix(ins, outs) {
  let parsed_in = parseArray(ins);
  let our_ins = ins.map(mol => parseMolecule(mol));
  let our_outs = outs.map(mol => parseMolecule(mol));
  let equation = our_ins.concat(our_outs);

  let res = [];

  // Loop through number of distinct elements in the inputs:
  for (let i=0; i < Object.keys(parsed_in).length; i++) {
    let row = [];
    let elem = Object.keys(parsed_in)[i];

    // Loop through each molecule in the equation:
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

  // Populate rest of matrix if necessary: (not worrying about other possibility for now)
  while (res.length < res[0].length) {
    let row = new Array(res[0].length).fill(0);
    res.push(row);
  }

  return res;
}


export function solveMatrix(mat) {
  // first number tells our genTests function how many tests to generate.
  // In fact, we shouldn't do it this way, we should check them as we're generating them so that we don't needlessly generate ones that won't be checked.
  let ourTests = genTests(8, mat.length);

  let res = [];

  // Convert all vector entries to integers:
  let ourTestsInts = ourTests.map(test => test.map(t => parseInt(t)));

  // Oh and we also want to ignore *any* solutions containing a 0....
  for (let i=0; i < ourTestsInts.length; i++) {
    let test = ourTestsInts[i];
    let result = multiplyMatrixAndVector(mat, test);
    let target = new Array(mat.length).fill(0);

    // Ooooh you can't check for equality of matrices with ==:
    if (result.join(',') == target.join(',') && !test.includes(0)) {
      res = test;
      break;
    }
  }

  return res;
}
