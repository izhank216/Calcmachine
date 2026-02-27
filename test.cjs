const fs = require('fs');
const path = require('path');
const vm = require('vm');

global.Calcmachine = {
    debugMode: { enabled: false }
};

const bundlePath = path.join(__dirname, 'dist', 'index.min.js');
const bundleContent = fs.readFileSync(bundlePath, 'utf8');
vm.runInThisContext(bundleContent);

const { Memory, CPU } = global.Calcmachine;
const memory = new Memory(65536);
const cpu = new CPU(memory);


try {
    const program = new Uint8Array(fs.readFileSync('math.bin'));
    cpu.load(program);
    const result = cpu.run();
    console.log("Result:", result);
} catch (err) {
    process.exit(1);
}


