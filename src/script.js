// Description
//   A Hubot script to check status of your m2m-status sims
//
// Dependencies:
//   "m2m-status": "0.1.0"
//
// Configuration:
//   M2M_USER, M2M_PASS
//
// Commands:
//   hubot m2m check <sim> - Check status of sim
//   hubot m2m check <icc> - Check status of icc
//
// Author:
//   lgaticaq

const M2m = require('m2m-status')

module.exports = robot => {
  const getStatus = (res, method) => {
    res.send('Checking status...')
    const client = new M2m({
      user: process.env.M2M_USER,
      password: process.env.M2M_PASS
    })
    return client[method](res.match[1])
  }

  const onResult = result => {
    let msg = `Administration: ${result.status.admin ? 'OK' : 'Error'}\n`
    msg += `GSM: ${result.status.gsm ? 'OK' : 'Error'}\n`
    msg += `GPRS: ${result.status.gprs ? 'OK' : 'Error'}`
    return msg
  }

  robot.respond(/m2m check (\+\d{11})/, res => {
    getStatus(res, 'checkSim')
      .then(result => res.send(onResult(result)))
      .catch(err => {
        res.send(`Error: ${err.message}`)
        robot.emit('error', err)
      })
  })

  robot.respond(/m2m check (\d{19})/, res =>
    getStatus(res, 'checkIcc')
      .then(result => res.send(onResult(result)))
      .catch(err => {
        res.send(`Error: ${err.message}`)
        robot.emit('error', err)
      })
  )
}
