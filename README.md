# hubot-m2m-status

[![npm version](https://img.shields.io/npm/v/hubot-m2m-status.svg)](https://www.npmjs.com/package/hubot-m2m-status)
[![npm downloads](https://img.shields.io/npm/dm/hubot-m2m-status.svg)](https://www.npmjs.com/package/hubot-m2m-status)
[![Build Status](https://img.shields.io/travis/lgaticaq/hubot-m2m-status.svg)](https://travis-ci.org/lgaticaq/hubot-m2m-status)
[![Coverage Status](https://img.shields.io/coveralls/lgaticaq/hubot-m2m-status/master.svg)](https://coveralls.io/github/lgaticaq/hubot-m2m-status?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/3472286f33b0a02c80e4/maintainability)](https://codeclimate.com/github/lgaticaq/hubot-m2m-status/maintainability)
[![dependency Status](https://img.shields.io/david/lgaticaq/hubot-m2m-status.svg)](https://david-dm.org/lgaticaq/hubot-m2m-status#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/hubot-m2m-status.svg)](https://david-dm.org/lgaticaq/hubot-m2m-status#info=devDependencies)

> A Hubot script to check status of your m2mdataglobal sims

## Installation
```bash
npm i -S hubot-m2m-status
```

Set environment variable *M2M_USER* and *M2M_PASS* to login and get info sim.

add `["hubot-m2m-status"]` to `external-scripts.json`.

## Examples

`hubot m2m check <sim>` -> `Check status of sim`

`hubot m2m check <icc>` -> `Check status of icc`

## License

[MIT](https://tldrlegal.com/license/mit-license)
