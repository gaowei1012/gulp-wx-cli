/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 12:26:34
 * @LastEditTime: 2019-08-27 13:02:23
 * @LastEditors: Please set LastEditors
 */
Page({
  onLoad: function() {
    this.getLocation()
  },

  getLocation() {
    wx.getLocation({})
  }
})