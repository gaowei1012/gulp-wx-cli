/*
 * @Description: 天气详情
 * @Author: 执念
 * @Date: 2019-08-27 18:53:03
 * @LastEditTime: 2019-08-27 20:17:24
 * @LastEditors: Please set LastEditors
 */
const request = require('request');

const he_weather_api = 'https://free-api.heweather.net/s6/weather';

const $ = require('../../inline/utils');

exports.main = async (event) => {
  // const {lat, lng} = event
  let location = `${40.056974},${116.307689}`;
  let parmas = {
    location,
    key: 'a54b1c81d8e343929a3a79659040a51a'// 和风天气中的key
  }

  let query = [];
  for(let i in parmas) {
    query.push(`${i}=${encodeURIComponent(parmas[i])}`)
    console.log(query)
  }

  let url = he_weather_api + '?' + query.join('&')
  console.log(url)

  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error)
      } else {
        try {
          let rs = $.handlerData(JSON.parse(body))
          resolve(rs)
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}