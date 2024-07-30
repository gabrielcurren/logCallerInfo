const path = require('path');


async function findProjectRoot() {
    let currentDir = __dirname;
    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
        const parentDir = path.dirname(currentDir);
        if (parentDir === currentDir) {
            throw new Error('Could not find project root (package.json file not found).');
        }
        currentDir = parentDir;
    }
    return currentDir;
}



async function logCallerInfo(...args) {
    const error = new Error();
    const stack = error.stack.split('\n');

    // Extract the caller function's information from the stack trace
    const callerLine = stack[2]; // The caller is the third line in the stack trace
    const callerNameMatch = callerLine.match(/at (\S+)/);
    const callerName = callerNameMatch ? callerNameMatch[1] : 'anonymous';

    console.log(`Called by function: ${callerName}`);

    // Find the project root
    const projectRoot = await findProjectRoot();

    // Use the tests folder in the project root
    const testsFolderPath = path.join(projectRoot, 'tests');
    if (!fs.existsSync(testsFolderPath)) {
        fs.mkdirSync(testsFolderPath, { recursive: true });
    }

    const testFilePath = path.join(testsFolderPath, `${callerName}.test.json`);

    if (!fs.existsSync(testFilePath)) {
        fs.writeFileSync(testFilePath, JSON.stringify(args));
    } else {
        const testFileContent = fs.readFileSync(testFilePath, 'utf8');
        const testArgs = JSON.parse(testFileContent);
        console.log(testArgs)
        return testArgs;
    }
}

module.exports = { logCallerInfo }