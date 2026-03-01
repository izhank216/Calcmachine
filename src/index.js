import Memory from "./Memory.js"
import CPU from "./CPU.js"
import GPU from "./GPU.js"

class Calcmachine {

  constructor() {
    this.memory = new Memory()
    this.cpu = new CPU(this.memory)
    this.gpu = new GPU(this.memory)
    this.debug = false
  }

  run(program) {
    this.memory.clear()

    this.cpu.stack = []
    this.cpu.callStack = []
    this.cpu.pc = 0
    this.cpu.running = false

    this.gpu.pc = 0
    this.gpu.running = false
    this.gpu.registers.fill(0)
    this.gpu.vram.fill(0)

    this.cpu.load(program)

    if (Calcmachine.debugMode && Calcmachine.debugMode.enabled) {
      this.debug = true
      console.log("Calcmachine debug mode ENABLED")
    }

    if (this.debug) {
      this.cpu.stepHook = (cpu) => {
        console.log(`CPU PC: ${cpu.pc}`)
      }
    }

    return this.cpu.run()
  }

}

Calcmachine.debugMode = {
  enabled: false,
  enable() { this.enabled = true }
}

export { Calcmachine, CPU, Memory, GPU }
