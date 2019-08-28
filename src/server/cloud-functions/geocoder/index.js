/*
 * @Description: 地图逆向坐标
 * @Author: 执念
 * @Date: 2019-08-27 18:52:51
 * @LastEditTime: 2019-08-28 10:45:24
 * @LastEditors: Please set LastEditors
 */

const request = require('request');

const QQ_MAP_KEY = 'MHGBZ-PNXHW-P3TRA-OL7G7-D4I6E-7BFDM';
const QQ_MAP_URL = 'https://apis.map.qq.com/ws/geocoder/v1/';

exports.mian = async (event) => {
  const {lat, lon} = event;
  // const location = `${31.18826},${121.43687}`;
  const location = `${lat},${lon}`;
  const url = `${QQ_MAP_URL}?key=${QQ_MAP_KEY}&get_poi=0&location=${location}`;
  console.log(url)
  return new Promise((resolve, reject) => {
    request.get(url, (err, response, body) => {
      if (err || response.statusCode !== 200) {
        reject()
      } else {
        try {
          let res = JSON.parse(body).result;
          console.log(res)
          delete res.address_reference
          delete res.formatted_addresses
          delete res.location
          console.log(res)
          resolve(res)
        } catch(e) {
          reject(e)
        }
      }
    })
  })
}