Helper = require("hubot-test-helper")
expect = require("chai").expect
proxyquire = require("proxyquire")

process.env.M2M_USER = "user"
process.env.M2M_PASS = "password"

class M2m
  constructor: ->
  checkStatus: (sim) ->
    return new Promise (resolve, reject) ->
      if sim is "+56999999999"
        resolve({admin: true, gsm: true, gprs: true})
      else if sim is "+56888888888"
        resolve({admin: false, gsm: false, gprs: false})
      else
        reject(new Error("Sim #{sim} not found or not active"))

proxyquire("./../src/script.coffee", {"m2m-status": M2m})

helper = new Helper("./../src/index.coffee")

describe "hubot-m2m-status", ->
  room = null

  beforeEach ->
    room = helper.createRoom({name: "user"})

  afterEach ->
    room.destroy()

  context "invalid", ->
    beforeEach (done) ->
      room.user.say("user", "hubot m2m check +56111111111")
      setTimeout(done, 100)

    it "should get a error", ->
      expect(room.messages).to.eql([
        ["user", "hubot m2m check +56111111111"]
        ["hubot", "Checking status..."]
        ["hubot", "Error: Sim +56111111111 not found or not active"]
      ])

  context "valid data false", ->
    beforeEach (done) ->
      room.user.say("user", "hubot m2m check +56888888888")
      setTimeout(done, 100)

    it "should get a sim status", ->
      message = "Administration: Error\n"
      message += "GSM: Error\n"
      message += "GPRS: Error"
      expect(room.messages).to.eql([
        ["user", "hubot m2m check +56888888888"]
        ["hubot", "Checking status..."]
        ["hubot", message]
      ])

  context "valid data true", ->
    beforeEach (done) ->
      room.user.say("user", "hubot m2m check +56999999999")
      setTimeout(done, 100)

    it "should get a sim status", ->
      message = "Administration: OK\n"
      message += "GSM: OK\n"
      message += "GPRS: OK"
      expect(room.messages).to.eql([
        ["user", "hubot m2m check +56999999999"]
        ["hubot", "Checking status..."]
        ["hubot", message]
      ])
