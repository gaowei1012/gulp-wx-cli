/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 18:53:03
 * @LastEditTime: 2019-08-28 15:15:17
 * @LastEditors: Please set LastEditors
 */
const API_URL = 'https://free-api.heweather.net/s6/weather'
const request = require('request')

/*<jdists import="../../inline/utils.js" />*/

/*<remove>*/
const $ = require('../../inline/utils')
/*</remove>*/

exports.main = async (event) => {
  const {lat,lon} = event
  let location = `${31.230939719080258},${121.4849025683968}`
  let params = {
    location,
    key: 'a54b1c81d8e343929a3a79659040a51a' //和风天气中应用的密钥
  }
  let query = []
  for (let i in params) {
    query.push(`${i}=${encodeURIComponent(params[i])}`)
  }
  let url = API_URL + '?' + query.join('&')
  // console.log(url)
  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error)
      } else {
        try {
          let res = JSON.parse(body)
          //console.log(res.HeWeather6[0])
          resolve(res.HeWeather6[0])
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}
