# Description
#   A Hubot script to check status of your m2m-status sims
#
# Dependencies:
#   "simple-encryptor": "0.0.2"
#
# Configuration:
#   M2M_USER, M2M_PASS
#
# Commands:
#   hubot m2m check <sim> - Check status of sim
#
# Author:
#   lgaticaq

m2m = require "m2m-status"

module.exports = (robot) ->
  robot.respond /m2m check (\+\d{11})/, (res) ->
    sim = res.match[1]
    res.send "Checking status..."
    client = new m2m({
      user: process.env.M2M_USER,
      password: process.env.M2M_PASS
    })
    client.checkSim(sim).then (result) ->
      msg = "Administration: #{if result.admin then 'OK' else 'Error'}\n"
      msg += "GSM: #{if result.gsm then 'OK' else 'Error'}\n"
      msg += "GPRS: #{if result.gprs then 'OK' else 'Error'}"
      res.send(msg)
    .catch (err) ->
      res.send "Error: #{err.message}"
      robot.emit "error", err
