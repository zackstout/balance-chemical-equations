# Balancing Chemical equations
I thought it would be a fun challenge to write an algorithm that takes in a list of reagents and products and balances the equation for you. The strategy is to convert the list of reagents and products into a matrix, and then use brute force.

We count up through all possible vectors ([0, 0, 0], [0, 0, 1], ...) until we hit the solution. We set a max capacity in case the equation has no solution.

## Screenshot:
![screen shot 2018-06-27 at 7 28 37 pm](https://user-images.githubusercontent.com/29472568/42006603-68f8a518-7a40-11e8-9f24-5d6ea0e85301.png)

## Notes:
- Cool, we learned about Math.js, even if we couldn't make use of it for this project.
- It now works with multi-digit subscripts. 
- Last bit of refactoring should be with the test generator -- should be checking them for correctness as they're generated, so we don't generate them needlessly. This way, we can up the max capacity, too.
