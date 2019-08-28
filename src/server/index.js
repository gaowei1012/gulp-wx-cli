/*
 * @Description: wx cloud server index 
 * @Author: your name
 * @Date: 2019-08-27 18:50:32
 * @LastEditTime: 2019-08-28 10:59:15
 * @LastEditors: Please set LastEditors
 */
const path = require('path');
const express = require('express');

const { PORT } = require('../../config.server.json');
const heAir = require('./cloud-functions/he-air').main;
const heWeather = require('./cloud-functions/he-weather').main;
const gecoder = require('./cloud-functions/geocoder').mian;
const jscode2session = require('./cloud-functions/jscode2session').main;

console.log(heAir)

const app = express()

app.use('/static', express.static(path.join(__dirname, 'static'), {
  index: false,
  maxage: '30d'
}))

app.get('/api/he-air', (req, res, next) => {
  heAir(req.query).then(res.json.bind(res)).catch((e) => {
    console.error(e)
    next()
  })
})

app.get('/api/he-weather', (req, res, next) => {
  heWeather(req.query).then(res.json.bind(res)).catch((e) => {
    console.error(e)
    next()
  })
})

app.get('/api/gecoder', (req, res, next) => {
  gecoder(req.query).then(res.json.bind(res)).catch((e) => {
    console.error(e)
    next()
  })
})

app.get('/api/jscode2session', (req, res, next) => {
  jscode2session(req.query).then(res.json.bind(res)).catch((e) => {
    console.error(e)
    next()
  })
})


app.listen(PORT, () => {
  console.log('wx cloud function server started')
})