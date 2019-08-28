/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 13:06:37
 * @LastEditTime: 2019-08-28 15:16:43
 * @LastEditors: Please set LastEditors
 */
import Promise from './bluebird';
// import request from 'request';

const QQ_MAP_KEY = "MHGBZ-PNXHW-P3TRA-OL7G7-D4I6E-7BFDM";
const HF_URL = "https://free-api.heweather.net/s6/weather";
const HF_KEY = "a54b1c81d8e343929a3a79659040a51a";

// wx cloud function
wx.cloud.init({
  env: 'tianqi-xxx'
});

const db = wx.cloud.database();

// 逆向坐标地址
export const gecoder = (lat, lng, success = () => {}, final = () => {}) => {
  return wx.request({
    url: 'https://apis.map.qq.com/ws/geocoder/v1/',
    data: {
      location: `${lat},${lng}`,
      key: QQ_MAP_KEY,
      get_poi: 0
    },
    success,
    final
  })
}

// 调用微信接口，获取openid
export const jscode2session = (code) => {
  // wx clound function 云函数的一种
  return wx.cloud.callFunction({
    name: 'jscode2session',
    data: {
      code
    }
  });
}

// 获取和风天气
// export const getWeather = (lat, lon) => {
//   return wx.cloud.callFunction({
//     name: 'he-weather',
//     data: {
//       lat,
//       lon
//     }
//   })
// }

export const getWeather = (lat, lon) => {
  return wx.cloud.callFunction({
    name: 'he-weather',
    data: {
      lat,
      lon
    }
  })
}

/*
export const getWeather = (lat, lon) => {
  let url = `${HF_URL}?location=${lat},${lon}&key=${HF_KEY}`;
  // let location = `${lat},${lon}`;
  // let url = `${HF_URL}?localtion=${lat},${lon}&key=`
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      // data: {data},
      headers: {
        'content-type': 'application/json'
      },
      success(res) {
        // console.log(res)
        resolve(res)
      },
      fial(e) {
        reject(e)
      }
    })
  })
}
*/

// 获取空气质量
export const getAir = (city) => {
  return wx.cloud.callFunction({
    name: 'he-air',
    data: {city}
  })
}
