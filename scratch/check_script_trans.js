const fs = require('fs');
const code = fs.readFileSync('script.js', 'utf8');
const match = code.match(/const translations = \{[\s\S]*?^};\n/m);
if (match) {
    const evalCode = match[0] + '\nmodule.exports = translations;';
    const vm = require('vm');
    const sandbox = { module: {} };
    vm.createContext(sandbox);
    vm.runInContext(evalCode, sandbox);
    const trans = sandbox.module.exports;
    const enKeys = Object.keys(trans.en || {});
    const taKeys = Object.keys(trans.ta || {});
    const hiKeys = Object.keys(trans.hi || {});
    console.log('English keys:', enKeys.length);
    console.log('Tamil keys:', taKeys.length);
    console.log('Hindi keys:', hiKeys.length);
} else {
    console.log('Could not parse translations from script.js');
}
