/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 18:52:56
 * @LastEditTime: 2019-08-28 17:58:01
 * @LastEditors: Please set LastEditors
 */
const he_url = 'https://free-api.heweather.net/s6/air/now';
const request = require('request');
/*<jdists import="../../inline/utils.js" />*/

/*<remove>*/
const $ = require('../../inline/utils')
/*</remove>*/

exports.main = async (event) => {
  // let location = event.city;
  let location = 'shanghai';
  let parmas = {
    location,
    key: 'a54b1c81d8e343929a3a79659040a51a'// 和风天气中的key
  }
  let query = [];
  for(let i in parmas) {
    console.log(i)
    query.push(`${i}=${encodeURIComponent(parmas[i])}`)
  }

  let url = he_url + '?' + query.join('&')
  console.log(url)

  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      console.log(response + '---' + body)
      // if (error) reject(error)
      // if (response.statusCode !== 200) reject(error)

      if (error || response.statusCode !== 200) {
        reject(error)
      } else {
        try {
          let data = JSON.parse(body)
          console.log(data)
          if (data && data.HeWeather6 && data.HeWeather6[0].air_now_city) {
            let {aqi, qlty} = data.HeWeather6[0].air_now_city;
            resolve({
              status: 0,
              aqi,
              color: $.airBackgroundColor(aqi),
              name: qlty
            })
          } else {
            resolve({
              status: 500
            })
          }
        } catch(err) {
          reject(err)
        }
      }
      
    })
  })

} 