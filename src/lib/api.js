/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 13:06:37
 * @LastEditTime: 2019-08-27 16:39:08
 * @LastEditors: Please set LastEditors
 */

const QQ_MAP_KEY = "MHGBZ-PNXHW-P3TRA-OL7G7-D4I6E-7BFDM";

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
