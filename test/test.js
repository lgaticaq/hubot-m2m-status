'use strict'

const Helper = require('hubot-test-helper')
const { expect } = require('chai')
const proxyquire = require('proxyquire')

process.env.M2M_USER = 'user'
process.env.M2M_PASS = 'password'

class M2m {
  constructor (username, password) {
    this.username = username
    this.password = password
  }
  checkSim (sim) {
    return new Promise((resolve, reject) => {
      if (sim === '+56999999999') {
        return resolve({ status: { admin: true, gsm: true, gprs: true } })
      } else if (sim === '+56888888888') {
        return resolve({ status: { admin: false, gsm: false, gprs: false } })
      } else {
        return reject(new Error(`Sim ${sim} not found or not active`))
      }
    })
  }
  checkIcc (icc) {
    return new Promise((resolve, reject) => {
      if (icc === '1111111111111111111') {
        return resolve({ status: { admin: true, gsm: true, gprs: true } })
      } else if (icc === '2222222222222222222') {
        return resolve({ status: { admin: false, gsm: false, gprs: false } })
      } else {
        return reject(new Error(`ICC ${icc} not found or not active`))
      }
    })
  }
}

proxyquire('./../src/script.js', { 'm2m-status': M2m })

const helper = new Helper('./../src/index.js')

describe('hubot-m2m-status', function () {
  beforeEach(() => {
    this.room = helper.createRoom({ name: 'user' })
  })

  afterEach(() => this.room.destroy())

  context('sim invalid', () => {
    beforeEach(done => {
      this.room.user.say('user', 'hubot m2m check +56111111111')
      setTimeout(done, 100)
    })

    it('should get a error', () => {
      expect(this.room.messages).to.eql([
        ['user', 'hubot m2m check +56111111111'],
        ['hubot', 'Checking status...'],
        ['hubot', 'Error: Sim +56111111111 not found or not active']
      ])
    })
  })

  context('icc invalid', () => {
    beforeEach(done => {
      this.room.user.say('user', 'hubot m2m check 3333333333333333333')
      setTimeout(done, 100)
    })

    it('should get a error', () => {
      expect(this.room.messages).to.eql([
        ['user', 'hubot m2m check 3333333333333333333'],
        ['hubot', 'Checking status...'],
        ['hubot', 'Error: ICC 3333333333333333333 not found or not active']
      ])
    })
  })

  context('sim valid data false', () => {
    beforeEach(done => {
      this.room.user.say('user', 'hubot m2m check +56888888888')
      setTimeout(done, 100)
    })

    it('should get a sim status', () => {
      let message = 'Administration: Error\n'
      message += 'GSM: Error\n'
      message += 'GPRS: Error'
      expect(this.room.messages).to.eql([
        ['user', 'hubot m2m check +56888888888'],
        ['hubot', 'Checking status...'],
        ['hubot', message]
      ])
    })
  })

  context('icc valid data false', () => {
    beforeEach(done => {
      this.room.user.say('user', 'hubot m2m check 2222222222222222222')
      setTimeout(done, 100)
    })

    it('should get a sim status', () => {
      let message = 'Administration: Error\n'
      message += 'GSM: Error\n'
      message += 'GPRS: Error'
      expect(this.room.messages).to.eql([
        ['user', 'hubot m2m check 2222222222222222222'],
        ['hubot', 'Checking status...'],
        ['hubot', message]
      ])
    })
  })

  context('sim valid data true', () => {
    beforeEach(done => {
      this.room.user.say('user', 'hubot m2m check +56999999999')
      setTimeout(done, 100)
    })

    it('should get a sim status', () => {
      let message = 'Administration: OK\n'
      message += 'GSM: OK\n'
      message += 'GPRS: OK'
      expect(this.room.messages).to.eql([
        ['user', 'hubot m2m check +56999999999'],
        ['hubot', 'Checking status...'],
        ['hubot', message]
      ])
    })
  })

  context('icc valid data true', () => {
    beforeEach(done => {
      this.room.user.say('user', 'hubot m2m check 1111111111111111111')
      setTimeout(done, 100)
    })

    it('should get a sim status', () => {
      let message = 'Administration: OK\n'
      message += 'GSM: OK\n'
      message += 'GPRS: OK'
      expect(this.room.messages).to.eql([
        ['user', 'hubot m2m check 1111111111111111111'],
        ['hubot', 'Checking status...'],
        ['hubot', message]
      ])
    })
  })
})
