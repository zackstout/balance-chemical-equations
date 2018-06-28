# Balancing Chemical equations
I thought it would be a fun challenge to write an algorithm that takes in a list of reagents and products and balances the equation for you. I think it should be straightforward now that I've written the determinant function. Final step, having dealt with the string parsing and generated an array, is to implement Cramer's rule.

All right, we got there -- couldn't use Cramer's Rule, because our determinant will always be zero. So we have a hacky solution of counting up through all possible vectors ([0, 0, 0], [0, 0, 1], ...) until we hit the solution. We set a max capacity in case the equation has no solution.

## Screenshot:
![screen shot 2018-06-27 at 7 28 37 pm](https://user-images.githubusercontent.com/29472568/42006603-68f8a518-7a40-11e8-9f24-5d6ea0e85301.png)


## Bugs:
- [x] Only works with single digit subscripts right now -- and my whole parseMolecule function is hacky/ugly. [SOLVED]

## Notes:
- Cool, we learned about Math.js, even if we couldn't make use of it for this project.
- Last bit of refactoring should be with the test generator -- should be checking them for correctness as they're generated, so we don't generate them needlessly. This way, we can up the max capacity, too.
