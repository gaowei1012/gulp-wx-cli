/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 13:06:37
 * @LastEditTime: 2019-08-27 13:09:02
 * @LastEditors: Please set LastEditors
 */

export const gecoder = (lat, lng, success = () => {}, final = () => {}) => {
  return wx.request({
    url: '',
    data: {
      location: {
        lat: lat,
        lng: lng
      }
    },
    success,
    final
  })
}
