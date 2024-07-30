#

This thing saves the arguments of a function in your code such that you can **replay** the function without re-running the entire codebase for diagnostic or whatever reasons.

1. Import this into the page you have your target function in.
    Example:

    ```javascript
    const { logCallerInfo } = require("./logCallerInfo.js")
    ```

2. If your function looks like this:

    ```javascript
    async function exampleFunction(a, b, c, d){
        const {x, y, z} = a;
        const p = b + c + d;
        ans = await someOtherFunction(x, y, z, p)
        return ans
    }
    ```

    You can do this:

    ```javascript
    async function exampleFunction(a, b, c, d){
        [a, b, c, d] = await logCallerInfo(...arguments)
        const {x, y, z} = a;
        const p = b + c + d;
        ans = await someOtherFunction(x, y, z, p)
        return ans
    }
    ```

    And then run the entire code once, this will save the ``a, b, c, d`` arguments into a test folder in .json format. Afterwhich you can just run the function directly instead:

    ```javascript
    async function exampleFunction(a, b, c, d){
        [a, b, c, d] = await logCallerInfo(...arguments)
        const {x, y, z} = a;
        const p = b + c + d;
        ans = await someOtherFunction(x, y, z, p)
        return ans
    }

    exampleFunction() // no need arguments
    ```
