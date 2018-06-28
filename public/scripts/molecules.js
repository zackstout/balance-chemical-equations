
export function parseMolecule(str) {
  var res = {};

  for (let i=0; i < str.length; i++) {
    let elem;
    if ((/[A-Z]/).test(str[i])) {
      // Check whether element has one or two characters:
      if ((i != str.length - 1) && (/[a-z]/).test(str[i+1])) {
        i = addProp(res, 1, str, i);
      } else {
        i = addProp(res, 0, str, i);
      }
    }
  }

  return res;
}

// x will be 0 or 1:
function addProp(obj, x, str, i) {
  let elem = x == 1 ? str[i] + str[i+1] : str[i];
  let num = '';

  if ((/\d/).test(str[i+1+x])) {
    // To allow for multi-digit subscripts, such as in C6H12O6:
    let m = 1;
    while ((/\d/).test(str[i + x + m])) {
      num += str[i + x + m];
      m++;
    }
    // Skip ahead:
    i += m + x - 1;
  } else {
    num = 1;
    i += x;
  }
  // Store the value in a property in our result object:
  obj[elem] = parseInt(num);
  // Return so that the loop remembers where it is:
  return i;
}


// Oh this isn't quite what we want, is it? We also need to keep track of position of molecule in our system. Still useful though, just could have been simpler (array of unique elements) for the purposes we end up using it for.
export function parseArray(arr) {
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
