export default class Calc1500GPU {

  constructor(memory) {
    this.mem = memory
    this.registers = new Float64Array(20)
    this.pc = 0
    this.running = false
    this.stepHook = null

    this.VRAM_SIZE = 200 * 1024
    this.vram = new Uint8Array(this.VRAM_SIZE)

    this.screenWidth = 320
    this.screenHeight = 200
  }

  load(program, offset = 0) {
    for (let i = 0; i < program.length; i++) {
      this.mem.write8(offset + i, program[i])
    }
    this.pc = offset
  }

  fetch8() {
    return this.mem.read8(this.pc++)
  }

  fetch16() {
    const value = this.mem.read16(this.pc)
    this.pc += 1
    return value
  }

  drawPixel(x, y, value) {
    if (x < 0 || y < 0) return
    if (x >= this.screenWidth || y >= this.screenHeight) return
    const addr = y * this.screenWidth + x
    if (addr < this.VRAM_SIZE) {
      this.vram[addr] = value & 0xFF
    }
  }

  readPixel(x, y) {
    const addr = y * this.screenWidth + x
    if (addr < this.VRAM_SIZE) {
      return this.vram[addr]
    }
    return 0
  }

  clearScreen(value = 0) {
    this.vram.fill(value & 0xFF)
  }

  fillRect(x, y, w, h, value) {
    for (let yy = 0; yy < h; yy++) {
      for (let xx = 0; xx < w; xx++) {
        this.drawPixel(x + xx, y + yy, value)
      }
    }
  }

  run() {
    this.running = true

    while (this.running) {

      const op = this.fetch8()

      switch (op) {

        case 0:
          break

        case 1:
          this.registers[this.fetch8()] = this.fetch8()
          break

        case 2:
          this.registers[this.fetch8()] = this.fetch16()
          break

        case 3: {
          const r1 = this.fetch8()
          const r2 = this.fetch8()
          this.registers[r1] += this.registers[r2]
          break
        }

        case 4: {
          const r1 = this.fetch8()
          const r2 = this.fetch8()
          this.registers[r1] -= this.registers[r2]
          break
        }

        case 5: {
          const r1 = this.fetch8()
          const r2 = this.fetch8()
          this.registers[r1] *= this.registers[r2]
          break
        }

        case 6: {
          const r1 = this.fetch8()
          const r2 = this.fetch8()
          this.registers[r1] /= this.registers[r2]
          break
        }

        case 7: {
          const r = this.fetch8()
          const addr = this.fetch16()
          this.registers[r] = this.mem.read16(addr)
          break
        }

        case 8: {
          const addr = this.fetch16()
          const r = this.fetch8()
          this.mem.write8(addr, this.registers[r])
          break
        }

        case 9:
          this.pc = this.fetch16()
          break

        case 10: {
          const r = this.fetch8()
          const addr = this.fetch16()
          if (this.registers[r] !== 0) this.pc = addr
          break
        }

        case 11:
          this.running = false
          break

        case 20: {
          const rx = this.fetch8()
          const ry = this.fetch8()
          const rv = this.fetch8()
          this.drawPixel(
            this.registers[rx] | 0,
            this.registers[ry] | 0,
            this.registers[rv] | 0
          )
          break
        }

        case 21:
          this.clearScreen(0)
          break

        case 22: {
          const rx = this.fetch8()
          const ry = this.fetch8()
          const rw = this.fetch8()
          const rh = this.fetch8()
          const rv = this.fetch8()
          this.fillRect(
            this.registers[rx] | 0,
            this.registers[ry] | 0,
            this.registers[rw] | 0,
            this.registers[rh] | 0,
            this.registers[rv] | 0
          )
          break
        }

        default:
          this.running = false
      }

      if (this.stepHook) this.stepHook(this)
    }
  }
}
