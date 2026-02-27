export default class CPU {

  constructor(memory) {
    this.mem = memory
    this.stack = []
    this.callStack = []
    this.pc = 0
    this.running = false
     this.stepHook = null 
  }

load(program, offset = 0) {
  for (let i = 0; i < program.length; i++) {
    this.mem.write8(offset + i, program[i]);
  }
  this.pc = offset;
}

  fetch8() {
    return this.mem.read8(this.pc++)
  }

  fetch16() {
    const value = this.mem.read16(this.pc);
    this.pc += 1; 
    return value;
  }

  run() {
    this.running = true
    

    while (this.running) {

      const op = this.fetch8()
            if (typeof Calcmachine !== "undefined" && Calcmachine.debugMode && Calcmachine.debugMode.enabled) {
        console.log(`PC: ${this.pc - 1}, OP: ${op}, STACK: [${this.stack.join(", ")}]`)
      }

      switch (op) {

        case 0:
          break

        case 1:
          this.stack.push(this.fetch8())
          break

        case 2:
          this.stack.push(this.fetch16())
          break

        case 3:
          this.stack.push(this.stack.pop() + this.stack.pop())
          break

        case 4: {
          const b = this.stack.pop()
          const a = this.stack.pop()
          this.stack.push(a - b)
          break
        }

        case 5:
          this.stack.push(this.stack.pop() * this.stack.pop())
          break

        case 6: {
          const b = this.stack.pop()
          const a = this.stack.pop()
          this.stack.push(a / b)
          break
        }

        case 7: {
          const b = this.stack.pop()
          const a = this.stack.pop()
          this.stack.push(a % b)
          break
        }

        case 8:
          this.stack.push(-this.stack.pop())
          break

        case 9:
          this.stack.push(this.stack[this.stack.length - 1])
          break

        case 10: {
          const addr = this.fetch16()
          this.callStack.push(this.pc)
          this.pc = addr
          break
        }

        case 11:
          if (this.callStack.length === 0) {
            this.running = false
          } else {
            this.pc = this.callStack.pop()
          }
          break

        case 12:
          this.running = false
          break
   
        case 13:
          this.stack.push(Math.sqrt(this.stack.pop()))
          break

        case 14: { 
          const b = this.stack.pop()
          const a = this.stack.pop()
          this.stack.push(Math.pow(a, b))
          break
        }

        case 15:
          this.stack.push(Math.sin(this.stack.pop()))
          break

        case 16:
          this.stack.push(Math.cos(this.stack.pop()))
          break

        case 17: 
          this.stack.push(Math.tan(this.stack.pop()))
          break

        case 18:
          this.stack.push(this.stack.pop() & this.stack.pop())
          break

        case 19:
          this.stack.push(this.stack.pop() | this.stack.pop())
          break

        case 20:
          this.stack.push(this.stack.pop() ^ this.stack.pop())
          break

        case 21: {
          const b = this.stack.pop()
          const a = this.stack.pop()
          this.stack.push(a === b ? 1 : 0)
          break
        }

        case 22: {
          const b = this.stack.pop()
          const a = this.stack.pop()
          this.stack.push(a < b ? 1 : 0)
          break
        }

        case 23: {
          const b = this.stack.pop()
          const a = this.stack.pop()
          this.stack.push(a > b ? 1 : 0)
          break
        }
 

       case 24: {
          const addr = this.fetch16()
          const condition = this.stack.pop()
          if (condition !== 0) {
            this.pc = addr
          }
          break
        }
  
        case 25:
          this.pc = this.fetch16()
          break

        default:
          this.running = false
      }
    }

    return this.stack[this.stack.length - 1] || 0
  }

}