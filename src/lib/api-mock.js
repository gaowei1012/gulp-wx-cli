/*
 * @Description: api mock
 * @Author: 执念
 * @Date: 2019-08-28 09:45:36
 * @LastEditTime: 2019-08-28 15:11:32
 * @LastEditors: Please set LastEditors
 */
import Promise from './bluebird';

const QQ_MAP_KEY = "MHGBZ-PNXHW-P3TRA-OL7G7-D4I6E-7BFDM";


// 获取天气详情
export const getWeather = (lat, lon) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://127.0.0.1:3000/api/he-weather',
      data: {
        lat,
        lon
      },
      success: (res) => {
        resolve({result: res.data})
      },
      fial: (e) => {
        reject(e)
      }
    })
  })
}

// 获取weather air
export const getAir = (city) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://127.0.0.1:3000/api/he-air',
      data: { city },
      success: (res) => {
        resolve({result: res.data})
      },
      fial: (e) => {
        reject(e)
      }
    })
  })
}

// 获取位置
export const gecoder  = (lat, lon, success = () => {}, fial = () => {}) => {
  return wx.request({
    url: 'https://apis.map.qq.com/ws/geocoder/v1/',
    data: {
      location: `${lat},${lon}`,
      key: QQ_MAP_KEY,
      get_poi: 0
    },
    success,
    fial
  })
}


// 获取jscode2session
export const jscode2session = (code) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://127.0.0.1:3000/api/jscode2session',
      data: { code },
      success: (res) => {
        resolve({result: res.data})
      },
      fial: reject
    })
  })
}
