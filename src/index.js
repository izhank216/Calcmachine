import Memory from "./Memory.js"
import CPU from "./CPU.js"

class Calcmachine {

  constructor() {
    this.memory = new Memory()
    this.cpu = new CPU(this.memory)
    this.debug = false
  }

  run(program) {
    this.memory.clear()
    this.cpu.stack = []
    this.cpu.callStack = []
    this.cpu.load(program)

    if (Calcmachine.debugMode && Calcmachine.debugMode.enabled) {
      this.debug = true
      console.log("Calcmachine debug mode ENABLED")
    }

    const stepHook = this.debug ? (op, pc, stack) => {
      console.log(`PC: ${pc}, OP: ${op}, STACK: [${stack.join(", ")}]`)
    } : null

    if (stepHook) this.cpu.stepHook = stepHook

    return this.cpu.run()
  }

}


Calcmachine.debugMode = {
  enabled: false,
  enable() { this.enabled = true },
}

export { Calcmachine, CPU, Memory }