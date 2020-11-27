const ora = require('ora')

class Ora {
  constructor(message) {
    const spin = ora(message)
    spin.color = 'red'
    spin.start()
    this.spin = spin
  }
  succeed(text = '') {
    this.spin.succeed(text.green)
  }
  fail(text = '') {
    this.spin.fail(text.red)
  }
}

module.exports = Ora
