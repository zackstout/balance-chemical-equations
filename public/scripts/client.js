
import { solveMatrix } from './matrix.js';
import { genTests } from './matrix.js';
import { generateMatrix } from './matrix.js';
import { getMols } from './matrix.js';


$(document).ready(function() {

  // Basic UI:
  $('.sub').on('click', function() {
    var reagents = $('.reagents').val().split(',');
    var products = $('.products').val().split(',');
    // console.log(reagents, products);
    // console.log(getMols(reagents));

    let solution = balanceEq(reagents, products);

    var output = '';
    reagents.concat(products).forEach((mol, index) => {
      if (solution[index] != 1) {
        output += solution[index];
      }
      output += format(mol);
      if (index == reagents.length - 1) {
        output += ' --> ';
      } else if (index != solution.length - 1) {
        output += ' + ';
      }
    });

    $('.output').html(output);



    // Graphic representation:
    let reagent_mols = getMols(reagents); // array of objects
    let product_mols = getMols(products);

    $.get('/stuff').then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err);
    });
  });


  // Tests:
  balanceEq(['CH4', 'Cl2'], ['CCl4', 'HCl']);
  balanceEq(['Fe2O3', 'C'], ['Fe', 'CO2']);
  balanceEq(['N2', 'H2'], ['NH3']);
  balanceEq(['C2H4', 'O2'], ['CO2', 'H2O']);
});

// Takes two arrays. E.g. ['CO2', 'H2O'], ['O2', 'C6H12O6']
function balanceEq(reagents, products) {
  var matrix = generateMatrix(reagents, products);
  var solution = solveMatrix(matrix);
  console.log(reagents, products, matrix, solution);
  return solution;
}


const digits = [0, 1, 2, 3, 4, 5,6, 7, 8, 9];

function format(mol) {
  let res = '';
  const digitStrings = digits.map(char => char.toString());
  for (let i=0; i < mol.length; i++) {
    let char = mol[i];
    if (!digitStrings.includes(char)) {
      res += char;
    } else {
      res += `<sub>${char}</sub>`;
    }
  }

  return res;
}





// console.log(parseArray(['MgSO4', 'CaCl2', 'CO3']));
