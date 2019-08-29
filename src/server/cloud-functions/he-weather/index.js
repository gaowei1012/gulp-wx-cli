/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 18:53:03
 * @LastEditTime: 2019-08-29 18:10:33
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
  let location = `${lat},${lon}`
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
          let rs = $.handlerData(JSON.parse(body))
          console.log(rs)
          resolve(rs)
        } catch (e) {
          reject(e)
        }
      }
    })
  })
}
