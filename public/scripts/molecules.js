
export function parseMolecule(str) {
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
