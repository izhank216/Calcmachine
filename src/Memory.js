export default class Memory {
  constructor(size = 65536) {
    this.size = size
    this.mem = new Float64Array(size)
  }

  read8(addr) {
    if (addr < 0 || addr >= this.size) return 0
    return this.mem[addr]
  }

  write8(addr, value) {
    if (addr < 0 || addr >= this.size) return
    this.mem[addr] = value
  }

  read16(addr) {
    return this.read8(addr)
  }

  write16(addr, value) {
    this.write8(addr, value)
  }

  clear() {
    this.mem.fill(0)
  }
}