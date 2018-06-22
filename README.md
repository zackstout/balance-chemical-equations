# Balancing Chemical equations
I thought it would be a fun challenge to write an algorithm that takes in a list of reagents and products and balances the equation for you. I think it should be straightforward now that I've written the determinant function. Final step, having dealt with the string parsing and generated an array, is to implement Cramer's rule.

## Bugs:
- Only works with single digit subscripts right now -- and my whole parseMolecule function is hacky/ugly.
